import { Router } from 'express'

import { validate, validateParams } from '../../../middleware/validate'
import {
  handleCreatePost,
  handleGetActivePosts,
  handleGetAllPosts,
  handleGetDeletedlPosts,
  handleGetPostById,
  handleSoftDeletePost,
} from '../controller/post.controller'
import { createPostValidator, postIdSchema } from '../validator'

export const postRoutes = Router()

postRoutes.post('/', validate(createPostValidator), handleCreatePost)
postRoutes.get('/all', handleGetAllPosts)
postRoutes.get('/deleted', handleGetDeletedlPosts)
postRoutes.get('/active', handleGetActivePosts)
postRoutes.get('/:id', validateParams(postIdSchema), handleGetPostById)
postRoutes.patch('/:id/softDelete', handleSoftDeletePost)
