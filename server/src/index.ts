import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { authRoutes, postRoutes } from './modules'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 7002

app.use(cors())
app.use(express.json())
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT)

export default app
