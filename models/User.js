import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        default:"unnamed user",
        unique:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    bio:{
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    watchlist: { // has one 
        type:Object,
        ref:"Watchlist",
        default:{}
    },
    watched: {
        type:Object,
        ref:"Watched",
        default:{}
    }, 
    ratings: { // has many
        type:Object,
        ref:"Rating",
        default:{}
    },
    followers: { // has many : array of all users following a single user_id
        type:Object,
        ref:"Followers",
        default:{}
    },
    following: { // has many : array of all users follower by single user_id
        type:Object,
        ref:"Following",
        default:{}
    }



})

module.exports = mongoose.model("User", UserSchema)