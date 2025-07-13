import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { addMinutes } from 'date-fns'
import jwt from 'jsonwebtoken'

import { Role, User } from '../../../generated/prisma'
import { AuthenticatedRequest } from '../../../middleware'
import { mailService } from '../../mailer'
import { authRepository } from '../repository/auth.repository'

const generateAccessToken = (userId: string): string =>
  jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })

const generateRefreshToken = (userId: string): string =>
  jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  })

const generateVerificationToken = (userId: string): string =>
  jwt.sign({ userId }, process.env.VERIFICATION_TOKEN_SECRET!, {
    expiresIn: '15m',
  })

export const authService = {
  async register(data: {
    email: string
    password: string
    name?: string
    role?: Role
  }): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const existing = await authRepository.findByEmail(data.email)
    if (existing) throw new Error('Email already in use')

    const hashed = await bcrypt.hash(data.password, 10)

    const user = await authRepository.createUser({
      email: data.email,
      password: hashed,
      name: data.name,
      role: data.role,
    })

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)
    const verificationToken = generateVerificationToken(user.id)

    await authRepository.saveRefreshToken(user.id, refreshToken)
    await mailService.sendMail({
      to: user.email,
      subject: 'Verify your email',
      html: `
        <h1>Welcome, ${user.name ?? 'user'}!</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${process.env.FRONTEND_URL}/verify-email/${user.id}/${verificationToken}">Verify Email</a>
      `,
    })
    return { user, accessToken, refreshToken }
  },

  async login(data: {
    email: string
    password: string
  }): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await authRepository.findByEmail(data.email)
    if (!user) throw new Error('Invalid credentials')

    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) throw new Error('Invalid credentials')

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    await authRepository.saveRefreshToken(user.id, refreshToken)

    return { user, accessToken, refreshToken }
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
    } catch (error) {
      throw new Error('Invalid or expired token: ' + error)
    }

    if (decoded.userId !== data.userId) {
      throw new Error('Invalid token')
    }

    await authRepository.markEmailAsVerified(data.userId)

    return { message: 'Email successfully verified' }
  },

  async resendVerificationEmail(data: {
    email: string
  }): Promise<{ token: string }> {
    const user = await authRepository.findByEmail(data.email)
    if (!user) throw new Error('User not found')

    if (user.emailVerified) throw new Error('Email already verified')

    const token = generateAccessToken(user.id)

    // itt majd email küldés jönhet
    return { token }
  },

  async forgotPassword(data: { email: string }) {
    const user = await authRepository.findByEmail(data.email)
    if (!user) throw new Error('User not found')

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = addMinutes(new Date(), 15)

    await authRepository.savePasswordResetToken(user.id, token, expiresAt)

    // TODO: email küldése itt (pl. nodemailer vagy külső API)

    return { message: 'Password reset email sent' }
  },

  async resetPassword(data: { token: string; newPassword: string }) {
    const resetRecord = await authRepository.findResetToken(data.token)
    if (!resetRecord || resetRecord.expiresAt < new Date())
      throw new Error('Invalid or expired reset token')

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
    if (!user) throw new Error('User not found')

    const isMatch = await bcrypt.compare(data.currentPassword, user.password)
    if (!isMatch) throw new Error('Invalid current password')

    const hashed = await bcrypt.hash(data.newPassword, 10)
    await authRepository.updatePassword(user.id, hashed)

    return { message: 'Password changed successfully' }
  },

  async refreshToken(data: { refreshToken: string }) {
    const decoded = jwt.verify(
      data.refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as { userId: string }

    const user = await authRepository.findById(decoded.userId)

    if (!user || user.refreshToken !== data.refreshToken) {
      throw new Error('Invalid refresh token')
    }

    const newAccessToken = generateAccessToken(user.id)
    const newRefreshToken = generateRefreshToken(user.id)

    await authRepository.saveRefreshToken(user.id, newRefreshToken)

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  },

  async getMe(req: AuthenticatedRequest) {
    if (!req.user?.userId) {
      throw new Error('Unauthorized')
    }

    const user = await authRepository.findById(req.user.userId)
    if (!user) throw new Error('User not found')

    return { user }
  },
}
