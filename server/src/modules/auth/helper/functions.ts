import jwt from 'jsonwebtoken'

import { User } from '../../../generated/prisma'
import { mailService } from '../../mailer'
import { MINUTES_IN_MS, REFRESH_TOKEN_EXPIRATION_TIME } from './constants'

export const authHelper = {
  generateAccessToken: (userId: string): string =>
    jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 15 * MINUTES_IN_MS,
    }),

  generateRefreshToken: (userId: string): string =>
    jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    }),

  generateVerificationToken: (userId: string): string =>
    jwt.sign({ userId }, process.env.VERIFICATION_TOKEN_SECRET!, {
      expiresIn: 15 * MINUTES_IN_MS,
    }),

  generatePasswordResetToken: (userId: string): string =>
    jwt.sign({ userId }, process.env.PASSWORD_RESET_TOKEN_SECRET!, {
      expiresIn: 15 * MINUTES_IN_MS,
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
}
