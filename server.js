import cors from 'cors'
import express from "express"
import mongoose from 'mongoose'
import userRouter from './routes/user.js'

const app = express();

const PORT = '8080'

app.listen(PORT, () => console.log(`Server running on ${PORT}`))

app.use(express.json())

const router = express.Router()

app.use('/user', userRouter)


const db = mongoose.connection;