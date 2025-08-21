import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './src/middlewares/errorHandler.js'
import adminRouter from './src/routes/admin.routes.js'
import blogRouter from './src/routes/blog.routes.js'
import commentRouter from './src/routes/comment.routes.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/blog',blogRouter)
app.use('/api/v1/comment',commentRouter)

app.get("/", (req, res) => {
  res.send("🚀 Backend API is running! Use /api/v1/... routes.");
});

app.use(errorHandler);
export { app }