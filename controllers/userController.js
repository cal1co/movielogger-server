import animalIdenticon from '../animal-identicon/animalIdenticon.js'
import userInfo from '../models/User.js'
import followers from '../models/Followers.js'
import following from '../models/Following.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


const userToken = (id) => {
    return jwt.sign(
        {id},
        process.env.TOKEN // jwt.secretKey,
    )
}

const addFilm = (filmInfo) => { // adds film to user if not existing.

}



const userIn = async (req,res) => { // check login
    const message = 'user in'
    return res.status(200).json(message) 
}

const edit = async (req, res) => {
  console.log('user edit controller called', req.body)
  let userId = req.body.id
  const currentUser = await userInfo.findOne({_id: userId})
  currentUser.name = req.body.newName
  await currentUser.save()
  const updatedUser = await userInfo.findOne({_id: userId})
  console.log('update user', updatedUser)
  return res.status(200).json(updatedUser);
}

const getUser = async (req, res) => { // grab info for user
  // const userId = req.params.id;
  const username = req.params.id;
  // console.log(req.params)
  const currentUser = await userInfo.findOne({username})
    .select("avatar followers following username email")
  return res.status(200).json(currentUser);
}

const login = async (req, res) => { // login user
  console.log('login controller called')
  // req.header("Access-Control-Allow-Origin", "*")
  const { email, password } = req.body
  const user = await userInfo.findOne({email})
  if (!user){ // incorrect credentials - email
    console.log('Sorry, invalid username or password')
    return res.status(401).json({response: 'Sorry, invalid username or password'})
  }
  const matched = await bcrypt.compare(password, user.password); // incorrect credentials - password
  if (!matched){
    console.log('Sorry, invalid username or password')
    return res.status(401).json({response: 'Sorry, invalid username or password'})
  }
  const token = userToken(user.id);
  return res.status(200).json({
    id:user.id,
    name: user.username,
    avatar: JSON.parse(user.avatar),
    token,
  })
}

const signup = async (req, res) => { // signup user
  const { username, email, password } = req.body
  console.log("LOOK HERE PLEASE!!!!!", req.body)
  const avatar = animalIdenticon(username)
  console.log("SIGNUP IS BEING CALLED IN BACKEND", "AVATAR", avatar)
  const encryptedPassword = bcrypt.hashSync(password, 10);
  // console.log('reaching token')
  const inUseMail = await userInfo.findOne({email});
  const inUseName = await userInfo.findOne({username});
  if (inUseMail){
    console.log('email already in use')
    return res.status(401).json({response:'email already in use'});
  }
  if (inUseName){
    return res.status(401).json({response:'username already in use'});
  }
  const bcryptPass = bcrypt.hashSync(password, 17)
  const createUser = await userInfo.create({ // CREATE USER
    username,
    email, // can just be 'email' but looks a little confusing
    avatar,
    password: encryptedPassword
  })
  if (!createUser){
    console.log(`can't create user`)
    return res.status(404).json({response: `Error: can't create user`})
  }


  const token = userToken(createUser.id)
  return res.status(200).json({ // login user
    id:createUser.id,
    token,
    avatar:JSON.parse(createUser.avatar),
    name:createUser.username
  })
}

const follow = async (req, res) => {
  console.log("FOLLOWING USER")
  const userId = req.body.id 
  const followId = req.body.followId

  const user = await userInfo.findOne({_id: userId})
  const following = await userInfo.findOne({_id: followId})

  user.following.push({username:following.username, avatar:following.avatar})
  following.followers.push({username:user.username, avatar:user.avatar})

  await user.save()
  await following.save()
  return res.status(200).json(user);
}

const unfollow = async (req, res) => {
  console.log("UNFOLLOWING USER")
  const userId = req.body.username
  const followId = req.body.followedUsername

  const user = await userInfo.findOne({username: userId})
  const following = await userInfo.findOne({username: followId})

  console.log(req.body)
  // console.log(user, following)
  if (user && following){
    const userIndex = user.following.findIndex((obj) => {
      return obj.username === following.username
    })
    const followedIndex = following.followers.findIndex((obj) => {
      return obj.username === user.username
    })
    user.following.splice(userIndex, 1)
    following.followers.splice(followedIndex, 1)
  
    await user.save()
    await following.save()
  
    return res.status(200).json(user);
  } // else return error message

}

const getFollower = async (req, res) => {
}

const getFollowing = async(req, res) => {

}

const getUsersFromSearchQuery = async (req, res) => {
  console.log('FINDING USERS FROM QUERY', req.params.query)

  const matched = await userInfo.aggregate([ // WOW! this is so cool
    {
      $search: {
        index: "default",
        text:{
          query:req.params.query,
          path:["username"],
          fuzzy:{
            maxEdits:2,
            prefixLength:2,
            maxExpansions:100
          }
        }
      }
    }
  ])
    console.log("MATCHED", matched)
  return res.status(200).json(matched);
}

const like = async (req, res) => {
  
}
const removeLike = async (req, res) => {

}
const rate = async (req, res) => {
  console.log("RATE IS BEING CALLED!")
  console.log(req.body)

  const username = req.body.user.name
  const film = req.body.filmInfo.filmData
  const setRating = req.body.rating

  const currentUser = await userInfo.findOne({username})

  // const matched = await currentUser.aggregate([ // WOW! this is so cool
  //   {
  //     $search: {
  //       index: "default",
  //       text:{
  //         query:film.id,
  //         path:["info"],
  //       }
  //     }
  //   }
  // ])
  // console.log(matched)
  // if (!matched){
  //   console.log("CAN'T FIND A MATCH!!!")
  // }

  const ratingData = {rating: setRating, film: {id: film.id, poster: film.poster_path, title: film.title}}
  currentUser.ratings.push(ratingData)
  await currentUser.save()
  const updatedUser = await userInfo.findOne({username})
  console.log('update user', updatedUser)
  return res.status(200).json(updatedUser);
}
const removeRate = async(req, res) => {

}

const watched = async (req, res) => {
  
}
const removeWatched = async (req, res) => {

}
const watchlist = async (req, res) => {
  
}
const removeWatchlist = async (req, res) => {

}
const getUserFilms = async (req, res) => {

}



export default {
  userIn,
  edit,
  getUser,
  login,
  signup,
  follow,
  unfollow,
  getUsersFromSearchQuery,
  like,
  removeLike,
  rate,
  removeRate,
  watched,
  removeWatched,
  watchlist,
  removeWatchlist,
  getUserFilms
}