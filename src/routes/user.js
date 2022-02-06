const express = require("express");
const userRouter = express.Router();
const {findUser, getInvitations} = require("../controllers/user");

userRouter.post("/finduser", findUser);
userRouter.post("/getinvitations", getInvitations);

module.exports = userRouter