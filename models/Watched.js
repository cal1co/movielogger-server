import mongoose from 'mongoose'

const WatchedSchema = new mongoose.Schema({
    user:{
        type:Object,
        ref:"User",
        default:{}
    },
    title:{
        type:String,
        id:Number,
    },
    watched:{
        type:Boolean,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
})


module.exports = mongoose.model("Watched", WatchedSchema)