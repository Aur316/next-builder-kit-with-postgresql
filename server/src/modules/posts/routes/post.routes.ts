import { Router } from 'express'

import { postController } from '../controller/post.controller'

export const postRoutes = Router()

postRoutes.post('/', postController.create)
postRoutes.get('/all', postController.getAll)
postRoutes.get('/deleted', postController.getDeleted)
postRoutes.get('/active', postController.getActive)
postRoutes.get('/:id', postController.getById)
postRoutes.patch('/:id/softDelete', postController.softDelete)
postRoutes.delete('/:id', postController.remove)
