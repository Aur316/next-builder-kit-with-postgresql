import { Post } from '../../../generated/prisma'
import { db } from '../../../lib'
import { CreatePostRequestV1 } from '../types/post.type'

export const insertPost = (data: CreatePostRequestV1): Promise<Post> => {
  return db.post.create({ data })
}

export const getAllPostsFromDb = async (): Promise<Array<Post>> => {
  return db.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
}
