import { User } from './user.type'

export type LoginFormProps = {
  email: string
  password: string
}

export type LoginResponse = {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export type AuthTokens = {
  accessToken: string
}
