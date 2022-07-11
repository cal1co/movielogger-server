import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'
import express from "express"
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import userRouter from './routes/user.js'
import { createAdapter } from '@socket.io/mongo-adapter'


dotenv.config()

mongoose.Promise = global.Promise
mongoose.connect(
    `mongodb+srv://calicoalix:${process.env.MONGO_PW}@cluster0.ixe4ykn.mongodb.net/?retryWrites=true&w=majority`, 
    {useNewUrlParser: true}
    )
    
const db = mongoose.connection;
const collection = "socket.io-adapter-eents"

const app = express();

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)

const server = http.createServer(app)
const io = new Server(server, {cors: {
    origin: '*',
    methods:['GET', 'POST']
}})

const users = {}
io.on('connection', (socket) => {
    console.log("A USER CONNECTED", socket.id);

    socket.onAny((event, ...args) => {
        console.log(event, args)
    })
    socket.on('online', (data) => {
        socket.join(data.roomNum)
        if (!users[socket.id]){
            users[socket.id] = data.uid
        } else {
            delete users[socket.id]
            users[socket.id] = data.uid
        }
        socket.emit('update status', users)
        socket.to(data.roomNum).emit('update status', users)
        console.log("***********************************************************", users)
        // console.log(data.roomNum)
    })
    socket.on('offline', (data) => {
        socket.leave(data.roomNum)
        socket.to(data.roomNum).emit('update status', users)
    })
    socket.on('message', (msg) => {
        console.log("RECIEVED MESSAGE: ", msg)
        socket.to(msg.roomId).emit('message', msg.message)
        socket.emit('message', msg.message)
        console.log('USERS:', users)
        socket.to(msg.roomId).emit('update status', users)
    })
    socket.on('disconnect', () => {
        console.log('A USER DISCONNECTED')
        delete users[socket.id]
        console.log("===============================================================")
        socket.disconnect()
    })
})



const PORT = process.env.PORT || '8888'
server.listen(PORT, () => console.log(`listening on ${PORT}`))
// app.listen(PORT, () => console.log(`Server running on ${PORT}`))

