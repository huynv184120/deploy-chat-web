const socketEvent = require("../events");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models");

const online = (io, socket) => {
    socket.on(socketEvent.online, async (req) => {
        try {
            const accessToken = req.token.split(" ")[1];
            user_id = jwt.decode(accessToken)._id;
            socket.user_id = user_id
            socket.join(user_id);
            const user = await UserModel.findById(socket.user_id);
            user.online = true;
            user.save();
            if (user) {
                user.rooms.forEach(room => {
                    socket.join(room);
                    io.to(room).emit(socketEvent.updateMemberInfo,[{_id:user._id,email : user.email, avatar:user.avatar, username:user.username, online:user.online}]);
                });
            }
            console.log(user.username + " online");
        }catch(err){
            
        }
    });
}

module.exports = online;