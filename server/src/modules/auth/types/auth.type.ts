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

export type UserApiResponse = {
  user: {
    id: string
    email: string
    name: string | null
    role: Role
  }
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export type LoginApiRequest = {
  email: string
  password: string
}
