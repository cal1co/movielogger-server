import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'
import express from "express"
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import rooms from './models/Room.js'
import userInfo from './models/User.js'
import userRouter from './routes/user.js'
import roomRouter from './routes/room.js'
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
app.use('/room', roomRouter)

const server = http.createServer(app)
const io = new Server(server, {cors: {
    origin: '*',
    methods:['GET', 'POST']
}})

const checkRoom = async (data) => {
    const room = await rooms.findOne({roomId: data.roomNum})
    const user = await userInfo.findOne({_id: data.uid})

        if (room){
            console.log("ROOM EXISTS!!", room.users)
            if (room.users === undefined){
                room.users.push(data.uid)
            } else {
                if (room.users.indexOf(data.uid) === -1){
                    room.users.push(data.uid)
                }
            }
            let inRoom = false 
            user.rooms.forEach(e => {
            if (e.roomId === data.roomNum){
                inRoom = true
            }
            })
            if (!inRoom) {
                user.rooms.push(room)
            }
        } else {
            const createRoom = rooms.create({
                users: [data.uid],
                roomId: data.roomNum,
            })
            user.rooms.push(createRoom)
            let inRoom = false 
            user.rooms.forEach(e => {
            if (e.roomId === data.roomNum){
                inRoom = true
            }
            })
            if (!inRoom) {
                user.rooms.push(createRoom)
            }
        }

        
    user.save()
    room.save()
}

const saveMsg = async (data) => {
    const { roomId, message, userId } = data
    const room = await rooms.findOne({roomId})
    const messageObj = {
        message,
        userId
    }
    for await (const user of room.users) {
        const peep = await userInfo.findOne({_id: user})
        peep.rooms.forEach(roomIdx => {
            if(roomIdx.roomId === roomId){
                roomIdx.messages.push(messageObj)
            }
        })
        peep.save()
        console.log("PEEP ROOMS HERE:-------------------------------------", peep.rooms)
    }
    room.messages.push(messageObj)
    room.save()
}

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
        checkRoom(data)
    })
    socket.on('offline', (data) => {
        delete users[socket.id]
        socket.to(data.roomNum).emit('update status', users)
        socket.leave(data.roomNum)
    })
    socket.on('message', (msg) => {
        console.log("RECIEVED MESSAGE: ", msg)
        socket.to(msg.roomId).emit('message', msg.message)
        saveMsg(msg)
    })

    socket.on('disconnecting', () => {
        console.log("+++++++++++++++++++++++++++++++++++++()()()()", )
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

