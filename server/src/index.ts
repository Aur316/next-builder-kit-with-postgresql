import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { postRoutes } from './modules/posts'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())
app.use('/api/posts', postRoutes)

app.listen(PORT)

export default app
