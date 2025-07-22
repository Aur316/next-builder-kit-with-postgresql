import { User } from './user.type'

export type RegistrationFormProps = {
  name: string
  email: string
  password: string
}

export type RegistrationResponse = {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
  }
}
