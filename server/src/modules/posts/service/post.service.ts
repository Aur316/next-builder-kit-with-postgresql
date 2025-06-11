import { mapPostToCreateResponse } from '../mapper'
import {
  fetchActivePosts,
  fetchAllPosts,
  fetchDeletedPosts,
  fetchPostById,
  insertPost,
  removePost,
} from '../repository'
import { CreatePostRequestV1, CreatePostResponseV1 } from '../types/post.type'

export const createPost = async (
  data: CreatePostRequestV1,
): Promise<CreatePostResponseV1> => {
  const insertedPost = await insertPost(data)
  return mapPostToCreateResponse(insertedPost)
}

export const getAllPosts = async (): Promise<Array<CreatePostResponseV1>> => {
  const posts = await fetchAllPosts()
  return posts.map(mapPostToCreateResponse)
}

export const getDeletedPosts = async (): Promise<
  Array<CreatePostResponseV1>
> => {
  const posts = await fetchDeletedPosts()
  return posts.map(mapPostToCreateResponse)
}

export const getActivePosts = async (): Promise<
  Array<CreatePostResponseV1>
> => {
  const posts = await fetchActivePosts()
  return posts.map(mapPostToCreateResponse)
}

export const getPostById = async (
  postId: string,
): Promise<CreatePostResponseV1> => {
  const post = await fetchPostById(postId)
  if (!post) {
    throw new Error('Post not found')
  }
  return mapPostToCreateResponse(post)
}

export const deletePost = async (
  postId: string,
): Promise<CreatePostResponseV1> => {
  const deletedPost = await removePost(postId)
  return mapPostToCreateResponse(deletedPost)
}
