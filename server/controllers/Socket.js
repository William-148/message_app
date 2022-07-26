import { nanoid } from 'nanoid';

let users = [];
let rooms = [];

const startSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
        // Sending socket id to recently connected user
        socket.emit('me', socket.id);
        
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
    
        // Request users and rooms*
        socket.on('request_users', () => {
            socket.emit('getAllUsers', users);
            socket.emit('updateRooms', rooms);
        });
        
        // Create rooms*
        socket.on('create_room', (name) => {
            const room = {
                id: nanoid(7),
                name,
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
}

export default startSocket;
