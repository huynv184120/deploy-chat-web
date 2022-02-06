const {MessageModel} = require("../models");

const getMessages= async (req, res) => {
    try{
        const roomId = req.body._id;
        const listMessages = await MessageModel.find({to:roomId});
        res.status(200).json({room_id: roomId,messages:listMessages});
    }catch(err){
        res.status(400);
    }
} 


module.exports =  {getMessages}