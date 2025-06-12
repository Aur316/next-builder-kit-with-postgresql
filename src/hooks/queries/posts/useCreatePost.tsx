import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import { OperationResult, postQueryFns } from '../../../data'
import { CreatePostRequest, CreatePostResponse } from '../../../types/post.type'

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutateAsync, isPending, isError } = useMutation<
    OperationResult<CreatePostResponse, ApiErrorResult>,
    Error,
    CreatePostRequest
  >({
    mutationFn: (post: CreatePostRequest) => postQueryFns.create(post, t),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKey.active() })
    },
  })

  return {
    createPost: mutateAsync,
    isPending,
    isError,
  }
}
