import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { postKey } from '../../../constants'
import {
  getDeletedPostsFn,
  isSuccess,
  mapGetPostsResponseToPostList,
} from '../../../data'
import { Post } from '../../../types/post.type'

export const useGetDeletedPosts = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: postKey.deleted(),
    queryFn: getDeletedPostsFn,
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
