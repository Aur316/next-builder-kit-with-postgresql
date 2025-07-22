import bcrypt from 'bcrypt'
import { addMinutes } from 'date-fns'
import jwt from 'jsonwebtoken'

import { Role } from '../../../generated/prisma'
import { AuthenticatedRequest } from '../../../middleware'
import { authHelper } from '../helper'
import { authMapper } from '../mapper/auth.mapper'
import { authRepository } from '../repository/auth.repository'
import {
  LoginApiRequest,
  RegistrationApiRequest,
  RegistrationApiResponse,
  UserApiResponse,
} from '../types/auth.type'

export const authService = {
  async register(
    data: RegistrationApiRequest,
  ): Promise<RegistrationApiResponse> {
    const existing = await authRepository.findByEmail(data.email)
    if (existing) throw new Error('register.emailAlreadyInUse')

    const hashed = await bcrypt.hash(data.password, 10)

    const user = await authRepository.createUser({
      email: data.email,
      password: hashed,
      name: data.name,
      role: Role.USER,
    })

    const accessToken = authHelper.generateAccessToken(user.id)
    const refreshToken = authHelper.generateRefreshToken(user.id)
    const verificationToken = authHelper.generateVerificationToken(user.id)

    await authHelper.sendVerificationEmail(user, verificationToken)

    await authRepository.saveRefreshToken(user.id, refreshToken)

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    }
  },

  async login(data: LoginApiRequest): Promise<UserApiResponse> {
    const user = await authRepository.findByEmail(data.email)
    if (!user) throw new Error('login.invalidCredentials')

    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) throw new Error('login.invalidCredentials')

    if (!user.emailVerified) {
      throw new Error('login.emailNotVerified')
    }
    const userResponse = authMapper.toUserResponse(user)

    const accessToken = authHelper.generateAccessToken(user.id)
    const refreshToken = authHelper.generateRefreshToken(user.id)

    await authRepository.saveRefreshToken(user.id, refreshToken)

    return {
      user: userResponse,
      tokens: {
        accessToken,
        refreshToken,
      },
    }
  },

  async verifyEmail(data: {
    userId: string
    token: string
  }): Promise<{ message: string }> {
    let decoded: { userId: string }
    try {
      decoded = jwt.verify(
        data.token,
        process.env.VERIFICATION_TOKEN_SECRET!,
      ) as {
        userId: string
      }
    } catch {
      throw new Error('verifyEmail.invalidOrExpiredToken')
    }

    if (decoded.userId !== data.userId) {
      throw new Error('verifyEmail.invalidToken')
    }

    await authRepository.markEmailAsVerified(data.userId)

    return { message: 'Email successfully verified' }
  },

  async resendVerificationEmail(data: {
    email: string
  }): Promise<{ token: string }> {
    const user = await authRepository.findByEmail(data.email)
    if (!user) throw new Error('resendVerificationEmail.userNotFound')

    if (user.emailVerified)
      throw new Error('resendVerificationEmail.emailAlreadyVerified')

    const verificationToken = authHelper.generateVerificationToken(user.id)
    await authHelper.sendVerificationEmail(user, verificationToken)

    return { token: verificationToken }
  },

  async forgotPassword(data: { email: string }) {
    const user = await authRepository.findByEmail(data.email)
    if (!user) throw new Error('forgotPassword.userNotFound')

    const passwordResetToken = authHelper.generatePasswordResetToken(user.id)
    const expiresAt = addMinutes(new Date(), 15)

    await authRepository.savePasswordResetToken(
      user.id,
      passwordResetToken,
      expiresAt,
    )

    await authHelper.sendForgotPasswordEmail(user, passwordResetToken)

    return { message: 'Password reset email sent' }
  },

  async resetPassword(data: { token: string; newPassword: string }) {
    const resetRecord = await authRepository.findResetToken(data.token)
    if (!resetRecord || resetRecord.expiresAt < new Date())
      throw new Error('resetPassword.invalidOrExpiredToken')

    const hashed = await bcrypt.hash(data.newPassword, 10)

    await authRepository.updatePassword(resetRecord.userId, hashed)
    await authRepository.deleteResetToken(data.token)

    return { message: 'Password has been reset successfully' }
  },

  async changePassword(data: {
    userId: string
    currentPassword: string
    newPassword: string
  }) {
    const user = await authRepository.findById(data.userId)
    if (!user) throw new Error('changePassword.userNotFound')

    const isMatch = await bcrypt.compare(data.currentPassword, user.password)
    if (!isMatch) throw new Error('changePassword.invalidCurrentPassword')

    const hashed = await bcrypt.hash(data.newPassword, 10)
    await authRepository.updatePassword(user.id, hashed)

    return { message: 'Password changed successfully' }
  },

  async refreshToken(data: { refreshToken: string }): Promise<UserApiResponse> {
    const decoded = jwt.verify(
      data.refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as { userId: string }

    const user = await authRepository.findById(decoded.userId)

    if (!user || user.refreshToken !== data.refreshToken) {
      throw new Error('refreshToken.invalidRefreshToken')
    }

    const newAccessToken = authHelper.generateAccessToken(user.id)
    const newRefreshToken = authHelper.generateRefreshToken(user.id)

    await authRepository.saveRefreshToken(user.id, newRefreshToken)

    return {
      user: authMapper.toUserResponse(user),
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    }
  },

  async getMe(req: AuthenticatedRequest) {
    if (!req.user?.userId) {
      throw new Error('getMe.unauthorized')
    }

    const user = await authRepository.findById(req.user.userId)
    if (!user) throw new Error('getMe.userNotFound')
    const userResponse = authMapper.toUserResponse(user)
    return { user: userResponse }
  },

  async getUserFromToken(token: string) {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
    return decoded
  },
}
