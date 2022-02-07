const socketEvent = require("../events");
const { UserModel, RoomModel } = require("../../models");

const editRoomInfo = (io, socket) =>{
    socket.on(socketEvent.updateRoomInfo, async (data) => {
        const room_id = data._id;
        const roomname = data.roomname;
        const  room = await RoomModel.findById(room_id);
        room.roomname = roomname;
        io.to(room_id).emit(socketEvent.updateRoom,room);
        room.save();
    })
}

module.exports = editRoomInfo;