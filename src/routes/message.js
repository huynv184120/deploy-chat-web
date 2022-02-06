const express = require("express");
const { getMessages } = require("../controllers/message");
const messageRouter = express.Router();

messageRouter.post("/getmessages",getMessages)

module.exports = messageRouter;