import { Request, Response } from 'express'

import { createPost, getPosts } from '../service'
import { CreatePostRequestV1 } from '../types/post.type'

export const handleCreatePost = async (
  req: Request<Record<string, never>, unknown, CreatePostRequestV1>,
  res: Response,
): Promise<void> => {
  const post = await createPost(req.body)
  res.status(201).json(post)
}

export const handleGetAllPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const posts = await getPosts()
  res.status(200).json(posts)
}
