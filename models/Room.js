import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
    users:{
        type:Array,
        ref:"User",
        default:[]
    },
    roomId:{
        type:String,
        requred:true
    },
    messages:{
        type:Array,
        ref:"Messages",
        default: []
    },
})


export default mongoose.model("Room", RoomSchema)