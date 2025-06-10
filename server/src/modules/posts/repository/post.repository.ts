import { Post } from '../../../generated/prisma'
import { db } from '../../../lib'
import { CreatePostRequestV1 } from '../types/post.type'

export const insertPost = (data: CreatePostRequestV1): Promise<Post> => {
  return db.post.create({ data })
}

export const getAllPosts = async (): Promise<Array<Post>> => {
  return db.post.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: { updatedAt: 'desc' },
  })
}

export const removePost = async (postId: string): Promise<Post> => {
  return db.post.update({
    where: { id: postId },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  })
}
