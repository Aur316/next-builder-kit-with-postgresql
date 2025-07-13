import {
  RegistrationFormProps,
  RegistrationResponse,
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
}
