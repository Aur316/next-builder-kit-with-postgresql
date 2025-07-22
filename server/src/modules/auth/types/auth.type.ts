import { Role, User } from '../../../generated/prisma'

export type RegistrationApiResponse = {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export type RegistrationApiRequest = {
  email: string
  password: string
  name?: string
}

export type UserResponse = {
  id: string
  email: string
  name: string | null
  role: Role
}

export type UserApiResponse = {
  user: UserResponse
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export type LoginApiRequest = {
  email: string
  password: string
}
