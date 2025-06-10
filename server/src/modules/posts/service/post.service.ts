import { mapPostToCreatePostResponse, mapPostToCreateResponse } from '../mapper'
import { getAllPostsFromDb, insertPost } from '../repository'
import { CreatePostRequestV1, CreatePostResponseV1 } from '../types/post.type'

export const createPost = async (
  data: CreatePostRequestV1,
): Promise<CreatePostResponseV1> => {
  const result = await insertPost(data)

  return mapPostToCreateResponse(result)
}

export const getAllPosts = async (): Promise<Array<CreatePostResponseV1>> => {
  const result = await getAllPostsFromDb()
  return result.map(mapPostToCreatePostResponse)
}
