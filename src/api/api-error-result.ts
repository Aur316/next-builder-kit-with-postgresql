export type ApiErrorResult = {
  status?: number
  data: {
    message: string
    errors?: Record<string, string>
    requestId?: string
  }
}
