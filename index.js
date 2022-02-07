
const express = require("express");
const route = require("./src/routes");
const db = require("./src/config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const socketController = require("./src/socket/handle_event");
const path = require("path");
const socketEvent = require("./src/socket/events");
dotenv.config();

const configCors = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true,
    optionsSuccessStatus: 204
}

const configCorsSocket = {
    cors: {
      origin: "*",
      credentials:true,
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'Cookies']    
    }
}



const app = express();
app.use(cors(configCors));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/../chat-client/build')));
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname + '/../chat-client/build/index.html'));
})

db.connect(process.env.MONGODB_URL);
const server = require("http").Server(app);
const io = require("socket.io")(server,configCorsSocket);

app.use((req, res, next)=>{
    req.io = io;
    next();
})
route(app);


io.on("connect", (socket) => {
    socketController.online(io, socket);
    socketController.offline(io, socket);
    socketController.createRoom(io, socket);
    socketController.sendMessage(io, socket);
    socketController.inviteMember(io, socket);
    socketController.editRoomInfo(io, socket);
})

server.listen(5000);


