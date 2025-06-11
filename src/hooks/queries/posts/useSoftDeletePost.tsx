import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import { OperationResult, softDeletePostFn } from '../../../data'

export const useSoftDeletePost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError } = useMutation<
    OperationResult<null, ApiErrorResult>,
    Error,
    string
  >({
    mutationFn: softDeletePostFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKey.active() })
    },
  })

  return {
    deletePosts: mutateAsync,
    isPending,
    isError,
  }
}
