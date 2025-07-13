import { Router } from 'express'

import { requireAuth } from '../../../middleware'
import { authController } from '../controller'

export const authRoutes = Router()

authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)
authRoutes.post('/logout', requireAuth, authController.logout)

authRoutes.post('/verify-email', authController.verifyEmail)
authRoutes.post(
  '/resend-verification-email',
  authController.resendVerificationEmail,
)

authRoutes.post('/forgot-password', authController.forgotPassword)
authRoutes.post('/reset-password', authController.resetPassword)

authRoutes.get('/me', requireAuth, authController.getMe)
authRoutes.post('/refresh-token', authController.refreshToken)
authRoutes.post('/change-password', requireAuth, authController.changePassword)
