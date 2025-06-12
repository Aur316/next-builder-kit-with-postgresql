import { Request, Response } from 'express'

import { postService } from '../service'
import { CreatePostRequestV1 } from '../types/post.type'

export const postController = {
  async create(
    req: Request<Record<string, never>, unknown, CreatePostRequestV1>,
    res: Response,
  ) {
    const addedPost = await postService.create(req.body)
    res.status(201).json(addedPost)
  },

  async getAll(req: Request, res: Response) {
    const posts = await postService.getAll()
    res.status(200).json(posts)
  },

  async getDeleted(req: Request, res: Response) {
    const posts = await postService.getDeleted()
    res.status(200).json(posts)
  },

  async getActive(req: Request, res: Response) {
    const posts = await postService.getActive()
    res.status(200).json(posts)
  },

  async getById(req: Request, res: Response) {
    const postId = req.params.id
    const post = await postService.getById(postId)
    res.status(200).json(post)
  },

  async softDelete(req: Request, res: Response) {
    const postId = req.params.id
    const result = await postService.softDelete(postId)
    res.status(200).json(result)
  },

  async remove(req: Request, res: Response) {
    const postId = req.params.id
    const result = await postService.delete(postId)
    res.status(200).json(result)
  },

  async update(req: Request, res: Response) {
    const updatedPost = await postService.update(req.body)
    res.status(200).json(updatedPost)
  },
}
