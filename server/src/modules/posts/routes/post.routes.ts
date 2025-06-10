import { Router } from 'express'

import { validate } from '../../../middleware/validate'
import {
  handleCreatePost,
  handleGetAllPosts,
} from '../controller/post.controller'
import { createPostValidator } from '../validator'

export const postRoutes = Router()

postRoutes.post('/', validate(createPostValidator), handleCreatePost)
postRoutes.get('/', handleGetAllPosts)
