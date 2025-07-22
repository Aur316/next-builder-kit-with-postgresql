import {
  LoginFormProps,
  LoginResponse,
  RegistrationFormProps,
  RegistrationResponse,
  User,
  UserResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '../../../types'
import { httpClient } from '../http'

const ROOT = '/auth'

export const authApiClient = {
  registration: (
    payload: RegistrationFormProps,
  ): Promise<RegistrationResponse> =>
    httpClient.post<RegistrationResponse>(`${ROOT}/register`, payload),

  verifyEmail: (payload: VerifyEmailRequest): Promise<VerifyEmailResponse> =>
    httpClient.post<VerifyEmailResponse>(`${ROOT}/verify-email`, payload),

  login: (payload: LoginFormProps): Promise<LoginResponse> =>
    httpClient.post<LoginResponse>(`${ROOT}/login`, payload),

  refreshToken: (): Promise<UserResponse> =>
    httpClient.post(`${ROOT}/refresh-token`, {}, { withCredentials: true }),

  getMe: (): Promise<User> =>
    httpClient.get(`${ROOT}/me`, { withCredentials: true }),

  logout: (): Promise<{ message: string }> =>
    httpClient.post(`${ROOT}/logout`, {}, { withCredentials: true }),
}
