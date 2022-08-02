import ROOM from './Room.js';
let users = [];

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
        socket.on('request_users', async () => {
            socket.emit('getAllUsers', users);
            const rooms = await ROOM.getAll();
            socket.emit('srv:updateRooms', rooms);
        });
        
        // Create rooms*
        socket.on('cl:create_room', async (name) => {
            const room = await ROOM.create(name);
            if(!room) {
                socket.emit('srv:error', "Room could not be created."); 
                return;
            }
            socket.join('' + room._id);
            socket.emit('srv:get_room', room);
            const rooms = await ROOM.getAll();
            socket.broadcast.emit('srv:updateRooms', rooms);
        });
    
        socket.on("cl:join_room", async (roomId) => {
            socket.join(roomId);
            const msgs = await ROOM.getFirstMessages(roomId);
            if(!!msgs)socket.emit('srv:getCurrentMsg', msgs);
        });
    
        socket.on("cl:message", async(payload) => {
            const result = await ROOM.saveMessage(payload)
            if(!!result) io.to(payload.roomId).emit('srv:chat', result);
        });

        socket.on("cl:old_messages", async(payload) => {
            const result = await ROOM.getMessagesBelowDate(payload.roomId, payload.timestamp);
            if(!!result) socket.emit('srv:old_messages', result);
        });
    });
}

export default startSocket;
