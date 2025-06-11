import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { ApiErrorResult } from '../../../api'
import { postKey } from '../../../constants'
import {
  OperationResult,
  getAllPostsFn,
  isSuccess,
  mapGetPostsResponseToPostList,
} from '../../../data'
import { GetPostsResponse, Post } from '../../../types/post.type'

export const useGetAllPosts = () => {
  const { data, isPending, isError } = useQuery<
    OperationResult<GetPostsResponse, ApiErrorResult>
  >({
    queryKey: postKey.list(),
    queryFn: getAllPostsFn,
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
