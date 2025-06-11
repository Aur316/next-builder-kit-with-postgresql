import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import { OperationResult, createPostFn } from '../../../data'
import { CreatePostRequest, CreatePostResponse } from '../../../types/post.type'

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation<
    OperationResult<CreatePostResponse, ApiErrorResult>,
    Error,
    CreatePostRequest
  >({
    mutationFn: createPostFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKey.active() })
    },
  })

  return {
    createPost: mutateAsync,
    isPending,
    error,
  }
}
