import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'
import express from "express"
import mongoose from 'mongoose'
import { Server } from 'socket.io'
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
app.use(express.json())
app.use('/user', userRouter)

const server = http.createServer(app)
const io = new Server(server, {cors: {
    origin: '*',
    methods:['GET', 'POST']
}})

io.on('connection', (socket) => {
    console.log("A USER CONNECTED");
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

const PORT = process.env.PORT || '8888'
server.listen(PORT, () => console.log(`listening on ${PORT}`))
// app.listen(PORT, () => console.log(`Server running on ${PORT}`))

