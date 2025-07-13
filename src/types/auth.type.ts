export type VerifyEmailRequest = {
  userId: string
  token: string
}

export type VerifyEmailResponse = {
  message: string
}
