import { VerifyEmailRequest, VerifyEmailResponse } from '../../../types'
import { httpClient } from '../http'

const ROOT = '/auth'

export const authApiClient = {
  verifyEmail: (payload: VerifyEmailRequest): Promise<VerifyEmailResponse> =>
    httpClient.post<VerifyEmailResponse>(`${ROOT}/verify-email`, payload),
}
