import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { authQueryFns } from '../../../data'

export const useLogOut = (init: () => void) => {
  const { t } = useTranslation()
  const {
    mutateAsync: logout,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => authQueryFns.logout(t),
    onSuccess: () => {
      init()
    },
  })

  return { logout, isPending, isError, error }
}
