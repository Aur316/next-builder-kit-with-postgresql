import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { ApiErrorResult } from '../../../api'
import { OperationResult, authQueryFns } from '../../../data'
import { VerifyEmailRequest, VerifyEmailResponse } from '../../../types'

export const useVerifyEmail = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { mutateAsync, isPending, isError, isSuccess } = useMutation<
    OperationResult<VerifyEmailResponse, ApiErrorResult>,
    Error,
    VerifyEmailRequest
  >({
    mutationFn: (payload: VerifyEmailRequest) =>
      authQueryFns.verifyEmail(payload, t),
    onSuccess: () => {
      router.push('/login')
    },
    onError: () => {
      router.push('/')
    },
  })

  return {
    verifyEmail: mutateAsync,
    isPending,
    isError,
    isSuccess,
  }
}
