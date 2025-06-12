import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import { OperationResult, postQueryFns } from '../../../data'

export const useSoftDeletePost = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutateAsync, isPending, isError } = useMutation<
    OperationResult<null, ApiErrorResult>,
    Error,
    string
  >({
    mutationFn: (postId: string) => postQueryFns.softDelete(postId, t),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKey.active() })
    },
  })

  return {
    softDeletePost: mutateAsync,
    isPending,
    isError,
  }
}
