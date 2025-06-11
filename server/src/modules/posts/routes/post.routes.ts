import { Router } from 'express'

import { validate } from '../../../middleware/validate'
import {
  handleCreatePost,
  handleDeletePost,
  handleGetActivePosts,
  handleGetAllPosts,
  handleGetDeletedlPosts,
} from '../controller/post.controller'
import { createPostValidator } from '../validator'

export const postRoutes = Router()

postRoutes.post('/', validate(createPostValidator), handleCreatePost)
postRoutes.get('/all', handleGetAllPosts)
postRoutes.get('/deleted', handleGetDeletedlPosts)
postRoutes.get('/active', handleGetActivePosts)
postRoutes.patch('/:id/delete', handleDeletePost)
