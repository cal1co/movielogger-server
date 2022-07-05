import animalIdenticon from '../animal-identicon/animalIdenticon.js'
import userInfo from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userToken = (id) => {
    return jwt.sign(
        {id},
        process.env.TOKEN // jwt.secretKey,
    )
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
    // .populate("trips")
  return res.status(200).json(currentUser);
}

const login = async (req, res) => { // login user
  console.log('login controller called')
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
    name: user.name,
    token
  })
}

const signup = async (req, res) => { // signup user
  const { username, email, password } = req.body
  const avatar = animalIdenticon(username)
  console.log("SIGNUP IS BEING CALLED IN BACKEND", "AVATAR", avatar)
  const encryptedPassword = bcrypt.hashSync(password, 10);
  // console.log('reaching token')
  const inUse = await userInfo.findOne({email});
  if (inUse){
    console.log('email already in use')
    return res.status(401).json({response:'email already in use'});
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
    avatar
  })
}

export default {
  userIn,
  edit,
  getUser,
  login,
  signup
}