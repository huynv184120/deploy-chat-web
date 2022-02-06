const socketEvent = require("../events");
const jwt = require("jsonwebtoken");
const {UserModel} = require("../../models");

const offline = (io, socket) => {
    socket.on(socketEvent.disconnect, async (req)=>{
        try{
            const user = await UserModel.findById(socket.user_id);
            user.online = false;
            socket.leave(socket.user_id);
            user.save();
            if(user){
                user.rooms.forEach(room => {
                    socket.leave(room);
                    io.to(room).emit(socketEvent.updateMemberInfo,[{_id:user._id,email : user.email, avatar:user.avatar, username:user.username, online:user.online}]);
                });
            }
            console.log(user.username+" offline");
            
        }
        catch(err){
            
        }
    });

}

module.exports = offline;