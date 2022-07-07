import userController from '../controllers/userController.js'
import express from 'express'
import userAuth from '../middleware/userAuth.js'

const checkAuth = userAuth.checkAuth 

const router = express.Router()

router.get('/userIn', checkAuth, userController.userIn)
router.get('/:id', userController.getUser)
router.get('/find/:query', userController.getUsersFromSearchQuery)
router.get('films', userController.getUserFilms)

router.post('/login', userController.login)
router.post('/signup', userController.signup)

router.post('/follow', userController.follow)
router.post('/unfollow', userController.unfollow)

router.post('/like', userController.like)
router.post('/remove/like', userController.removeLike)
router.post('/rate', userController.rate)
router.post('/remove/rate', userController.removeRate)
router.post('/watched', userController.watched)
router.post('/remove/watched', userController.removeWatched)
router.post('/watchlist', userController.watchlist)
router.post('/remove/watchlist', userController.removeWatchlist)


export default router