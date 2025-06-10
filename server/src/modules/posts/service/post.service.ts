import { mapPostToCreateResponse } from '../mapper'
import { getAllPosts, insertPost, removePost } from '../repository'
import { CreatePostRequestV1, CreatePostResponseV1 } from '../types/post.type'

export const createPost = async (
  data: CreatePostRequestV1,
): Promise<CreatePostResponseV1> => {
  const insertedPost = await insertPost(data)
  return mapPostToCreateResponse(insertedPost)
}

export const getPosts = async (): Promise<Array<CreatePostResponseV1>> => {
  const posts = await getAllPosts()
  return posts.map(mapPostToCreateResponse)
}

export const deletePost = async (
  postId: string,
): Promise<CreatePostResponseV1> => {
  const deletedPost = await removePost(postId)
  return mapPostToCreateResponse(deletedPost)
}
