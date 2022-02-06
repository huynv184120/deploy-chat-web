const authRouter = require("./auth");
const messageRouter = require("./message");
const roomRouter = require("./room");
const userRouter = require("./user");

const middleware = require("../middleware/middleware")
const route= (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/message", [middleware.verifyToken,messageRouter]);
    app.use("/api/room", [middleware.verifyToken, roomRouter]);
    app.use("/api/user", [middleware.verifyToken, userRouter]);
};

module.exports = route;
