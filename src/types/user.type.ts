export type User = {
  id: string
  name: string | null
  email: string
  role: Role
}

export type AuthTokens = {
  accessToken: string
  refreshToken?: string
}

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export type UserResponse = {
  user: User
  tokens: AuthTokens
}
