import mongoose from 'mongoose'

const FilmSchema = new mongoose.Schema({
    info:{
        id:Number,
        poster:String,
        title:String
    },
    rating:{
        type:Number,
        default:0
    },
    watched: {
        type:Boolean,
        default:false
    }, 
    watchlist: { // has one 
        type:Boolean,
        default:false
    },
})


export default mongoose.model("Film", FilmSchema)