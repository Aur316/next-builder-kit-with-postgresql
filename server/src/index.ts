import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { authRoutes, postRoutes } from './modules'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 7002
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT)

export default app
