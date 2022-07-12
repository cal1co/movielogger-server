import mongoose from 'mongoose'

const MessagesSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
})


export default mongoose.model("Messages", MessagesSchema)