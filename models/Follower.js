import mongoose from 'mongoose'

const FollowersSchema = new mongoose.Schema({
    username:{ // of the one being followed
        type:String,
    },
    follower:{
        username:String,
        id:String
    }
})


module.exports = mongoose.model("Followers", FollowersSchema)