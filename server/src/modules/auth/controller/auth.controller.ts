import { Request, Response } from 'express'

import { AuthenticatedRequest } from '../../../middleware'
import { REFRESH_TOKEN_EXPIRATION_TIME } from '../helper/constants'
import { authRepository } from '../repository'
import { authService } from '../service/auth.service'

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body)
    res.status(201).json(result)
  },

  async login(req: Request, res: Response) {
    const { user, tokens } = await authService.login(req.body)

    res
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        domain: process.env.COOKIE_DOMAIN || 'localhost',
        maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
      })
      .status(200)
      .json({ user, tokens })
  },

  async logout(req: AuthenticatedRequest, res: Response) {
    if (req.user?.userId) {
      await authRepository.deleteRefreshToken(req.user.userId)
    }
    res
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({ message: 'Logged out' })
  },

  async verifyEmail(req: Request, res: Response) {
    const result = await authService.verifyEmail(req.body)
    res.status(200).json(result)
  },

  async resendVerificationEmail(req: Request, res: Response) {
    const result = await authService.resendVerificationEmail(req.body)
    res.status(200).json(result)
  },

  async forgotPassword(req: Request, res: Response) {
    const result = await authService.forgotPassword(req.body)
    res.status(200).json(result)
  },

  async resetPassword(req: Request, res: Response) {
    const result = await authService.resetPassword(req.body)
    res.status(200).json(result)
  },

  async changePassword(req: AuthenticatedRequest, res: Response) {
    const result = await authService.changePassword({
      userId: req.user!.userId,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    })
    res.status(200).json(result)
  },

  async refreshToken(req: Request, res: Response) {
    const tokenFromCookie = req.cookies.refreshToken
    if (!tokenFromCookie) throw new Error('refreshToken.missing')

    const { user, tokens } = await authService.refreshToken({
      refreshToken: tokenFromCookie,
    })

    res
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
      })
      .status(200)
      .json({ user, tokens })
  },

  async getMe(req: AuthenticatedRequest, res: Response) {
    const result = await authService.getMe(req)
    res.status(200).json(result)
  },
}
