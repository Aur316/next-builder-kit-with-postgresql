import { User } from '../../../generated/prisma'

export type RegistrationApiResponse = {
  user: User
  accessToken: string
  refreshToken: string
}

export type RegistrationApiRequest = {
  email: string
  password: string
  name?: string
}
