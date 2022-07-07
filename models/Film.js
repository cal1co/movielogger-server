import mongoose from 'mongoose'

const FilmSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    poster:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
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