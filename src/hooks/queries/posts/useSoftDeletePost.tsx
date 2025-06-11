import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import { OperationResult, postQueryFns } from '../../../data'

export const useSoftDeletePost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError } = useMutation<
    OperationResult<null, ApiErrorResult>,
    Error,
    string
  >({
    mutationFn: postQueryFns.softDelete,
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
