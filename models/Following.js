import mongoose from 'mongoose'

const FollowingSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
})


export default mongoose.model("Following", FollowingSchema)