import { Role, User } from '../../../generated/prisma'
import { db } from '../../../lib'

interface CreateUserParams {
  email: string
  password: string
  name?: string
  role?: Role
}

export const authRepository = {
  findByEmail(email: string): Promise<User | null> {
    return db.user.findUnique({
      where: { email },
    })
  },

  findById(id: string): Promise<User | null> {
    return db.user.findUnique({
      where: { id },
    })
  },

  createUser(data: CreateUserParams): Promise<User> {
    return db.user.create({
      data,
    })
  },

  updatePassword(userId: string, hashedPassword: string): Promise<User> {
    return db.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    })
  },

  setEmailVerified(userId: string): Promise<User> {
    return db.user.update({
      where: { id: userId },
      data: {
        emailVerified: new Date(),
      },
    })
  },
  markEmailAsVerified(userId: string): Promise<User> {
    return db.user.update({
      where: { id: userId },
      data: { emailVerified: new Date() },
    })
  },
  savePasswordResetToken(userId: string, token: string, expiresAt: Date) {
    return db.passwordResetToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    })
  },

  findResetToken(token: string) {
    return db.passwordResetToken.findUnique({
      where: { token },
    })
  },

  deleteResetToken(token: string) {
    return db.passwordResetToken.delete({
      where: { token },
    })
  },

  saveRefreshToken(userId: string, token: string): Promise<User> {
    return db.user.update({
      where: { id: userId },
      data: { refreshToken: token },
    })
  },

  deleteRefreshToken(userId: string): Promise<User> {
    return db.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    })
  },
}
