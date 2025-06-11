import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import { OperationResult, postQueryFns } from '../../../data'

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError } = useMutation<
    OperationResult<null, ApiErrorResult>,
    Error,
    string
  >({
    mutationFn: postQueryFns.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKey.deleted() })
    },
  })

  return {
    deletePost: mutateAsync,
    isPending,
    isError,
  }
}
