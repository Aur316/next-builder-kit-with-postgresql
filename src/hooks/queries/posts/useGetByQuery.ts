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

export const useGetByQuery = (query: string) => {
  const { t } = useTranslation()

  const { data, isLoading, isError } = useQuery<
    OperationResult<GetPostsResponse, ApiErrorResult>
  >({
    queryKey: postKey.search(query),
    queryFn: () => postQueryFns.getByQuery(query, t),
    enabled: !!query,
  })

  const posts: Array<Post> | undefined = useMemo(() => {
    if (!data || !isSuccess(data)) return undefined
    return mapGetPostsResponseToPostList(data.payload)
  }, [data])

  return {
    posts,
    isLoading,
    isError,
  }
}
