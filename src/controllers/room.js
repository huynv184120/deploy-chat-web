const { UserModel, RoomModel } = require("../models");


const getRooms = async (req, res) => {
    try{
        const {rooms, ...other} = await UserModel.findById(req.user_id);
        const listRooms = await RoomModel.find({_id:{$in : rooms}});
        let listIdUsers = []
        let infoUsers = []
        listRooms.forEach((room) => {listIdUsers = [...room.members,...listIdUsers]});
        const listUsers = await UserModel.find({_id:{$in : listIdUsers}});
        listUsers.forEach((user) => {infoUsers = [{_id:user._id,email : user.email, avatar:user.avatar, username:user.username, online:user.online},...infoUsers]})
        const myInfo = infoUsers.find((usr) => usr._id == req.user_id);
        res.status(200).json({data:listRooms, users:infoUsers, myInfo});
    }catch(err){
        res.status(400);
    }

}

module.exports ={getRooms};