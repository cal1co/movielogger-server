import rooms from '../models/Room.js'
import userInfo from '../models/User.js'


const getRoomData = async (req, res) => {
    const id = req.params.id
    const room = await rooms.findOne({roomId: id})
    res.status(200).json(room)
}

export default {
    getRoomData
}