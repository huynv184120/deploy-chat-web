const express = require("express")
const authRouter = express.Router();

const {login, signup, verify} = require("../controllers/auth");


authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/verify", verify);


module.exports = authRouter;