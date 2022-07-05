import mongoose from 'mongoose'

const FollowersSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
})


export default mongoose.model("Followers", FollowersSchema)