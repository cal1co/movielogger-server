import mongoose from 'mongoose'

const RatingSchema = new mongoose.Schema({
    user:{
        type:Object,
        ref:"User",
        default:{}
    },
    title:{
        type:String,
        id:Number,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
})


module.exports = mongoose.model("Rating", RatingSchema)