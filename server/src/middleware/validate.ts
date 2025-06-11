import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        error: 'Invalid input',
        issues: result.error.format(),
      })
      return
    }

    req.body = result.data
    next()
  }

export const validateParams =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params)

    if (!result.success) {
      res.status(400).json({
        error: 'Invalid parameters',
        issues: result.error.format(),
      })
      return
    }

    req.params = result.data
    next()
  }
