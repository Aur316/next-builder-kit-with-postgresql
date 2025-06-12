import { Post } from '../../../generated/prisma'
import { PostResponseV1 } from '../types/post.type'

export const mapPostToCreateResponse = (post: Post): PostResponseV1 => {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }
}
