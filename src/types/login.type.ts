import { User } from './user.type'

export type LoginFormProps = {
  email: string
  password: string
}

export type LoginResponse = {
  user: User
  accessToken: string
  refreshToken: string
}
