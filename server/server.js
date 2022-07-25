import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';
import cors from 'cors';
import { connectDB } from './db/config.js';
import routes from './routes/UserRoutes.js'
import './config.js'

connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const PORT = 5000;
let users = [];
let rooms = [];

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));

/* ENDPOINTS */
app.get('/', (req, res) => {
    res.status(200).send({message:"Chat app!!"});
});

app.use('/', routes)

/* SOCKET */
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    // Sending socket id to recently connected user
    socket.emit('me', socket.id);
    // Sending all rooms and users to recently connected user
    socket.emit('getAllRooms', rooms);
    socket.broadcast.emit('updateUsers', users);
    
    
    // User discconect *
    socket.on('disconnect', () => {
        console.log(`User Disconnected: ${socket.id}`);
        users = users.filter((user) => user.socket !== socket.id);
        socket.broadcast.emit('updateUsers', users);
        socket.disconnect();
    });

    // Save new user connected*
    socket.on('new_user', (payload) => {
        // Save socket id into users array
        const result = users.filter((item) => item.id === payload.id);
        if(result.length === 0) users.push(payload);
        socket.broadcast.emit('updateUsers', users);
    });

    // Request users*
    socket.on('request_users', () => {
        // Save socket id into users array
        socket.emit('getAllUsers', users);
    });

    socket.on('create_room', () => {
        const room = {
            id: nanoid(7),
            chat: [],
        };

        socket.join(room);
        socket.emit('get_room', room);
        rooms.push(room);
        socket.broadcast.emit('updateRooms', rooms);
    });

    socket.on("join_room", (room) => {
        socket.join(room.id);
    });

    socket.on("message", (payload) => {
        rooms.map((room) => {
            if (room.id === payload.room) {
                const singleChat = { 
                    message: payload.message, 
                    writer: payload.socketId 
                };
                room.chat.push(singleChat);
                payload.chat = room.chat;
            }
        });
        io.to(payload.room).emit("chat", payload);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
