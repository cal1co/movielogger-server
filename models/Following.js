import mongoose from 'mongoose'

const FollowingSchema = new mongoose.Schema({
    username:{ // of the one doing the following
        type:String,
    },
    following:{
        username:String,
        id:String
    }
})


module.exports = mongoose.model("Following", FollowingSchema)