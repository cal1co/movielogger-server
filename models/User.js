import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({ // USER HAS FILMS WHICH HAVE RATINGS, WATCHED, WATCHLIST AS AN OBJECT. USER ALSO HAS THESE FIELDS SEPARATELY FOR DIFFERENT API REQUESTS.
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
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
        type:Array,
        ref:"Followers",
        default:[]
    },
    following: { // has many : array of all users follower by single user_id
        type:Array,
        ref:"Following",
        default:[]
    }



})

export default mongoose.model("User", UserSchema)