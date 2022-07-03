import mongoose from 'mongoose'

const RatingsSchema = new mongoose.Schema({
    user:{
        type:Object,
        ref:"User",
        default:{}
    },
    title:{
        type:String,
        id:Number,
    },
    score:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
})


module.exports = mongoose.model("Ratings", RatingsSchema)