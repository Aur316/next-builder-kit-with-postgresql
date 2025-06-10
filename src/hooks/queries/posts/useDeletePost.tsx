import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import { OperationResult, deletePostFn } from '../../../data'

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError } = useMutation<
    OperationResult<null, ApiErrorResult>,
    Error,
    string
  >({
    mutationFn: deletePostFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKey.list() })
    },
  })

  return {
    deletePost: mutateAsync,
    isPending,
    isError,
  }
}
