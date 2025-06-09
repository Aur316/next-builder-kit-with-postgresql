import { Request, Response } from 'express'

import { createPostService } from '../service'
import { createPostValidator } from '../validator'

export const createPostController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parse = createPostValidator.safeParse(req.body)

  if (!parse.success) {
    res.status(400).json({
      error: 'Invalid input',
      issues: parse.error.format(),
    })
    return
  }

  const post = await createPostService(parse.data)
  res.status(201).json(post)
}
