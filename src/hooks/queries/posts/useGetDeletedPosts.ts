import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import {
  OperationResult,
  isSuccess,
  mapGetPostsResponseToPostList,
  postQueryFns,
} from '../../../data'
import { GetPostsResponse, Post } from '../../../types/post.type'

export const useGetDeletedPosts = () => {
  const { t } = useTranslation()

  const { data, isPending, isError } = useQuery<
    OperationResult<GetPostsResponse, ApiErrorResult>
  >({
    queryKey: postKey.deleted(),
    queryFn: () => postQueryFns.getDeleted(t),
  })

  const posts: Array<Post> | undefined = useMemo(() => {
    if (!data || !isSuccess(data)) return undefined
    return mapGetPostsResponseToPostList(data.payload)
  }, [data])

  return {
    posts,
    isPending,
    isError,
  }
}
