import cors from 'cors'
import dotenv from 'dotenv'
import express from "express"
import mongoose from 'mongoose'
import userRouter from './routes/user.js'

dotenv.config()

mongoose.Promise = global.Promise
mongoose.connect(
    `mongodb+srv://calicoalix:${process.env.MONGO_PW}@cluster0.ixe4ykn.mongodb.net/?retryWrites=true&w=majority`, 
    {useNewUrlParser: true}
    )

const db = mongoose.connection;
const app = express();
app.use(cors())
const PORT = process.env.PORT || '8080'
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
app.use(express.json())
app.use('/user', userRouter)