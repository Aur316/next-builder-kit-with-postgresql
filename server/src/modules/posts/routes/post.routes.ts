import { Router } from 'express'

import { validate } from '../../../middleware/validate'
import { handleCreatePost } from '../controller/post.controller'
import { createPostValidator } from '../validator'

export const postRoutes = Router()

postRoutes.post('/', validate(createPostValidator), handleCreatePost)
