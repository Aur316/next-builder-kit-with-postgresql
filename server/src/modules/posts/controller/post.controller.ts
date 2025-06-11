import { Request, Response } from 'express'

import {
  createPost,
  deletePost,
  getActivePosts,
  getAllPosts,
  getDeletedPosts,
  getPostById,
  softDeletePost,
} from '../service'
import { CreatePostRequestV1 } from '../types/post.type'

export const handleCreatePost = async (
  req: Request<Record<string, never>, unknown, CreatePostRequestV1>,
  res: Response,
): Promise<void> => {
  const addedPost = await createPost(req.body)
  res.status(201).json(addedPost)
}

export const handleGetAllPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const posts = await getAllPosts()
  res.status(200).json(posts)
}

export const handleGetDeletedlPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const posts = await getDeletedPosts()
  res.status(200).json(posts)
}

export const handleGetActivePosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const posts = await getActivePosts()
  res.status(200).json(posts)
}

export const handleGetPostById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const postId = req.params.id
  const posts = await getPostById(postId)
  res.status(200).json(posts)
}

export const handleSoftDeletePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const postId = req.params.id
  const softDeletedPost = await softDeletePost(postId)
  res.status(200).json(softDeletedPost)
}

export const handleDeletePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const postId = req.params.id
  const softDeletedPost = await deletePost(postId)
  res.status(200).json(softDeletedPost)
}
