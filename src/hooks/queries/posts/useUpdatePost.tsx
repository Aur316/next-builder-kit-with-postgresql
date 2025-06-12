import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import { OperationResult, postQueryFns } from '../../../data'
import { Post } from '../../../types/post.type'

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError } = useMutation<
    OperationResult<Post, ApiErrorResult>,
    Error,
    Post
  >({
    mutationFn: postQueryFns.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKey.active() })
    },
  })

  return {
    updatePost: mutateAsync,
    isPending,
    isError,
  }
}
