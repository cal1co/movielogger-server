import userController from '../controllers/userController.js'
import express from 'express'
import userAuth from '../middleware/userAuth.js'

const checkAuth = userAuth.checkAuth 

const router = express.Router()

router.get('/userIn', checkAuth, userController.userIn)
router.get('/:id', userController.getUser)
router.get('/find/:query', userController.getUsersFromSearchQuery)
router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.post('/follow', userController.follow)
router.post('/unfollow', userController.unfollow)

export default router