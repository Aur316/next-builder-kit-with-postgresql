import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { authQueryFns } from '../../../data'
import { useAuth } from '../../../providers'
import { LoginFormProps } from '../../../types'

export const useLogin = () => {
  const { t } = useTranslation()
  const { setAuthData } = useAuth()
  const {
    mutateAsync: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: LoginFormProps) => authQueryFns.login(data, t),
    onSuccess: (data) => {
      if (data.isSuccess) {
        setAuthData(data.payload.user, data.payload.tokens)
        localStorage.setItem('accessToken', data.payload.tokens.accessToken)
      }
    },
  })

  return { login, isPending, isError, error }
}
