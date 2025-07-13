import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { authQueryFns } from '../../../data'
import { useAuth } from '../../../providers'
import { LoginFormProps } from '../../../types'

export const useLogin = () => {
  const { t } = useTranslation()
  const { setUser } = useAuth()
  const {
    mutateAsync: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: LoginFormProps) => authQueryFns.login(data, t),
    onSuccess: (data) => {
      if (data.isSuccess) {
        setUser(data.payload.user)
      }
    },
  })

  return { login, isPending, isError, error }
}
