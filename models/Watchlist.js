import mongoose from 'mongoose'

const WatchlistSchema = new mongoose.Schema({
    user:{
        type:Object,
        ref:"User",
        default:{}
    },
    titles:{
        type:Array,
    },
    score:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
})


module.exports = mongoose.model("Watchlist", WatchlistSchema)