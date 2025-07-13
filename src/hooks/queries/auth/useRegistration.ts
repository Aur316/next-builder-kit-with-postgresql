import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { ApiErrorResult } from '../../../api'
import { OperationResult, authQueryFns } from '../../../data'
import {
  RegistrationFormProps,
  RegistrationResponse,
} from '../../../types/registration.type'

export const useRegistration = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    mutateAsync: registration,
    isPending,
    isError,
    error,
  } = useMutation<
    OperationResult<RegistrationResponse, ApiErrorResult>,
    ApiErrorResult,
    RegistrationFormProps
  >({
    mutationFn: (data: RegistrationFormProps) =>
      authQueryFns.registration(data, t),
    onSuccess: (data) => {
      if (data.isSuccess) {
        router.push('/login')
      }
    },
  })
  return {
    registration,
    isPending,
    isError,
    error,
  }
}
