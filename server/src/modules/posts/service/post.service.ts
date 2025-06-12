import { Post } from '../../../generated/prisma'
import { mapPostToCreateResponse } from '../mapper'
import { postRepository } from '../repository'
import { CreatePostRequestV1, CreatePostResponseV1 } from '../types/post.type'

export const postService = {
  async create(data: CreatePostRequestV1): Promise<CreatePostResponseV1> {
    const insertedPost = await postRepository.insert(data)
    return mapPostToCreateResponse(insertedPost)
  },

  async getAll(): Promise<Array<CreatePostResponseV1>> {
    const posts = await postRepository.fetchAll()
    return posts.map(mapPostToCreateResponse)
  },

  async getDeleted(): Promise<Array<CreatePostResponseV1>> {
    const posts = await postRepository.fetchDeleted()
    return posts.map(mapPostToCreateResponse)
  },

  async getActive(): Promise<Array<CreatePostResponseV1>> {
    const posts = await postRepository.fetchActive()
    return posts.map(mapPostToCreateResponse)
  },

  async getById(postId: string): Promise<CreatePostResponseV1> {
    const post = await postRepository.fetchById(postId)
    if (!post) throw new Error('Post not found')
    return mapPostToCreateResponse(post)
  },

  async softDelete(postId: string): Promise<CreatePostResponseV1> {
    const post = await postRepository.softRemove(postId)
    return mapPostToCreateResponse(post)
  },

  async delete(postId: string): Promise<CreatePostResponseV1> {
    const post = await postRepository.remove(postId)
    return mapPostToCreateResponse(post)
  },

  update(data: Partial<Post>): Promise<Post> {
    return postRepository.update(data)
  },
}
