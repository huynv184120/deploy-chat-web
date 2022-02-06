const { UserModel, RoomModel } = require("../models");

const findUser = async (req, res) => {
    try{
        const email = req.body.email;
        const room_id = req.body.room_id;

        const regex = new RegExp(email, 'i');
        const user = await UserModel.find({email: regex});
        const room = await RoomModel.findById(room_id);

        if(user.length){
            let invite = true;
            if(user[0].rooms.some((_id) => _id === room_id)||room.invitedUsers.some((_id) => _id === user[0]._id.toString()))
                invite = false;
            res.status(200).json({_id:user[0]._id,email : user[0].email, avatar:user[0].avatar, username:user[0].username, online:user[0].online , invite:invite});
        }
        else res.status(200);
    }catch(err){
        res.status(400);
    }
}

const getInvitations = async (req, res) => {
    try{
        const user = await UserModel.findById(req.user_id);
        res.status(200).json(user.accessible);
    }catch(err){

    }
}

module.exports = {findUser, getInvitations};