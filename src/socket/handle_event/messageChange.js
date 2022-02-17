const socketEvent = require("../events");
const { MessageModel } = require("../../models");


const messageChange = (io, socket) => {
    socket.on(socketEvent.reactMessage, async (data) => {
        try{
            const user_id = socket.user_id;
            const type_reaction = data.reactType;
            const message_id = data.message_id;
            const mess = await MessageModel.findById(message_id);
            const room_id = mess.to.toString();
            
            const reaction = mess.reactions.find(reaction => (reaction.from == user_id));

            mess.reactions = mess.reactions.filter((reaction) => (reaction.from !== user_id));

            if ((reaction && (reaction.type != type_reaction)) || (!reaction)){
                mess.reactions = [{from:user_id, type: type_reaction} ,...mess.reactions];
            }

            io.to(room_id).emit(socketEvent.updateMessage, mess);
            mess.save();

            
        }catch(err){

        }
        
    })
}

module.exports = messageChange;