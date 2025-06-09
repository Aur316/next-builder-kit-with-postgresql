import { Router } from 'express'

import { createPostController } from '../controller/post.controller'

export const postRoutes = Router()

postRoutes.post('/', createPostController)
