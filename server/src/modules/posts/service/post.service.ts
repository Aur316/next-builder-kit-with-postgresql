import { mapPostToCreateResponse } from '../mapper'
import { getAllPosts, insertPost } from '../repository'
import { CreatePostRequestV1, CreatePostResponseV1 } from '../types/post.type'

export const createPost = async (
  data: CreatePostRequestV1,
): Promise<CreatePostResponseV1> => {
  const result = await insertPost(data)

  return mapPostToCreateResponse(result)
}

export const getPosts = async (): Promise<Array<CreatePostResponseV1>> => {
  const result = await getAllPosts()
  return result.map(mapPostToCreateResponse)
}
