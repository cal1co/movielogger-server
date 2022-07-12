import roomController from '../controllers/roomController.js'
import express from 'express'

const router = express.Router()


router.get('/find/:id', roomController.getRoomData)



export default router