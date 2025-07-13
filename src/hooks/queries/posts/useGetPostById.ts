import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import { OperationResult, isSuccess, postQueryFns } from '../../../data'
import { Post } from '../../../types/post.type'

export const useGetPostById = ({ postId }: { postId: string }) => {
  const { t } = useTranslation()

  const { data, isPending, isError } = useQuery<
    OperationResult<Post, ApiErrorResult>
  >({
    queryKey: postKey.detail(postId),
    queryFn: () => postQueryFns.getById(postId, t),
    enabled: !!postId,
  })

  const post: Post | undefined = useMemo(() => {
    if (!data || !isSuccess(data)) return undefined
    return data.payload
  }, [data])

  return {
    post,
    isPending,
    isError,
  }
}
