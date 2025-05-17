import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors({
   origin: process.env.CLIENT_URL,
   credentials: true
}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

app.use("/api/users", authRoutes)
app.use("/api/blogs", blogRoutes)

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
   })
})