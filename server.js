import cors from 'cors'
import express from "express"
import mongoose from 'mongoose'

const app = express();

const PORT = '8080'

app.listen(PORT, () => console.log(`Server running on ${PORT}`))

app.use(express.json())

const router = express.Router()

app.use('/', function(req, res){
    res.send('')
})


const db = mongoose.connection;