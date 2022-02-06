const socketEvent = require("../events");
const { UserModel, RoomModel } = require("../../models");

const createRoom = (io, socket) => {
    socket.on(socketEvent.createRoom, async (req) => {
        try {
            const user_id = socket.user_id;
            const user = await UserModel.findById(user_id);
            if (user) {
                const room = await RoomModel.create({
                    creator: user_id,
                    members: [user_id],
                    roomname:"new room"
                });
                socket.join(room._id.toString());                
                socket.emit(socketEvent.joinRoom, room);
                user.rooms = [room._id.toString(),...user.rooms]
                user.save();
            };
        } catch (err) {
            console.log("createRoom err");
        }
    });
}

module.exports = createRoom;