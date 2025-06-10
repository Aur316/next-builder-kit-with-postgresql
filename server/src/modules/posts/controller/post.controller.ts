import { Request, Response } from 'express'

import { createPost } from '../service'
import { CreatePostRequestV1 } from '../types/post.type'

export const handleCreatePost = async (
  req: Request<Record<string, never>, unknown, CreatePostRequestV1>,
  res: Response,
): Promise<void> => {
  const post = await createPost(req.body)
  res.status(201).json(post)
}
