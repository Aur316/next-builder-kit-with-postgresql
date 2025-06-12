import { Post } from '../../../generated/prisma'
import { mapPostToCreateResponse } from '../mapper'
import { postRepository } from '../repository'
import { PostRequestV1, PostResponseV1 } from '../types/post.type'

export const postService = {
  async create(data: PostRequestV1): Promise<PostResponseV1> {
    const insertedPost = await postRepository.insert(data)
    return mapPostToCreateResponse(insertedPost)
  },

  async getAll(): Promise<Array<PostResponseV1>> {
    const posts = await postRepository.fetchAll()
    return posts.map(mapPostToCreateResponse)
  },

  async getDeleted(): Promise<Array<PostResponseV1>> {
    const posts = await postRepository.fetchDeleted()
    return posts.map(mapPostToCreateResponse)
  },

  async getActive(): Promise<Array<PostResponseV1>> {
    const posts = await postRepository.fetchActive()
    return posts.map(mapPostToCreateResponse)
  },

  async getById(postId: string): Promise<PostResponseV1> {
    const post = await postRepository.fetchById(postId)
    if (!post) throw new Error('Post not found')
    return mapPostToCreateResponse(post)
  },

  async getByQuery(
    query: Record<string, string>,
  ): Promise<Array<PostResponseV1>> {
    const posts = await postRepository.fetchByQuery(query)
    return posts.map(mapPostToCreateResponse)
  },

  async softDelete(postId: string): Promise<PostResponseV1> {
    const post = await postRepository.softRemove(postId)
    return mapPostToCreateResponse(post)
  },

  async delete(postId: string): Promise<PostResponseV1> {
    const post = await postRepository.remove(postId)
    return mapPostToCreateResponse(post)
  },

  update(data: Partial<Post>): Promise<Post> {
    return postRepository.update(data)
  },
}
