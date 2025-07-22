import { User } from '../../../generated/prisma'
import { UserResponse } from '../types/auth.type'

export const authMapper = {
  toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  },
}
