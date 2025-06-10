import { Post } from '../../../generated/prisma'
import { CreatePostResponseV1 } from '../types/post.type'

export const mapPostToCreateResponse = (post: Post): CreatePostResponseV1 => {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt.toISOString(),
  }
}
