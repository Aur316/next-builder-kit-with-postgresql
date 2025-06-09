import { db } from '../../../lib'
import { CreatePostRequestV1 } from '../types/post.type'

export const insertPost = async (data: CreatePostRequestV1) => {
  const result = await db.post.create({
    data,
  })

  return result
}
