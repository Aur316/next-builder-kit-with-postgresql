import { z } from 'zod'

export const createPostValidator = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
})

export const postIdSchema = z.object({
  id: z.string().uuid(),
})
