const express = require("express");
const roomRouter = express.Router();
const {getRooms} = require("../controllers/room");


roomRouter.post("/getRooms",getRooms);


module.exports = roomRouter;