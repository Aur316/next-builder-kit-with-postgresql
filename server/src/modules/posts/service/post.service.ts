import { insertPost } from '../repository'
import { CreatePostRequestV1, CreatePostResponseV1 } from '../types/post.type'

export const createPostService = async (
  data: CreatePostRequestV1,
): Promise<CreatePostResponseV1> => {
  const result = await insertPost(data)

  return {
    id: result.id,
    title: result.title,
    content: result.content,
    createdAt: result.createdAt.toISOString(),
  }
}
