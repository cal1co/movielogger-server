import userController from '../controllers/userController.js'
import express from 'express'
import userAuth from '../middleware/userAuth.js'

const checkAuth = userAuth.checkAuth 

const router = express.Router()

router.get('/userIn', checkAuth, userController.userIn)
router.get('/:id', userController.getUser)
router.post('/login', userController.login)
router.post('/signup', userController.signup)

export default router