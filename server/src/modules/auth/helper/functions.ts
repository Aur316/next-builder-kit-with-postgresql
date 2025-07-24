import jwt from 'jsonwebtoken'

import { User } from '../../../generated/prisma'
import { mailService } from '../../mailer'
import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  PASSWORD_RESET_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
  VERIFICATION_TOKEN_EXPIRATION_TIME,
} from './constants'

export const authHelper = {
  generateAccessToken: (userId: string): string =>
    jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    }),

  generateRefreshToken: (userId: string): string =>
    jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    }),

  generateVerificationToken: (userId: string): string =>
    jwt.sign({ userId }, process.env.VERIFICATION_TOKEN_SECRET!, {
      expiresIn: VERIFICATION_TOKEN_EXPIRATION_TIME,
    }),

  generatePasswordResetToken: (userId: string): string =>
    jwt.sign({ userId }, process.env.PASSWORD_RESET_TOKEN_SECRET!, {
      expiresIn: PASSWORD_RESET_TOKEN_EXPIRATION_TIME,
    }),

  sendVerificationEmail: async (user: User, verificationToken: string) => {
    await mailService.sendMail({
      to: user.email,
      subject: 'Verify your email',
      html: `
            <h1>Welcome, ${user.name ?? 'user'}!</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${process.env.FRONTEND_URL}/verify-email/${user.id}/${verificationToken}">Verify Email</a>
          `,
    })
  },

  sendForgotPasswordEmail: async (user: User, passwordResetToken: string) =>
    mailService.sendMail({
      to: user.email,
      subject: 'Reset your password',
      html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}">Reset Password</a>
    `,
    }),
}
