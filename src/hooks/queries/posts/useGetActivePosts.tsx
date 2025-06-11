import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import {
  OperationResult,
  getActivePostsFn,
  isSuccess,
  mapGetPostsResponseToPostList,
} from '../../../data'
import { GetPostsResponse, Post } from '../../../types/post.type'

export const useGetActivePosts = () => {
  const { data, isPending, isError } = useQuery<
    OperationResult<GetPostsResponse, ApiErrorResult>
  >({
    queryKey: postKey.active(),
    queryFn: getActivePostsFn,
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
