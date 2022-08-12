import Message from './models/Message.js';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { connectDB } from './db/config.js';
import routes from './routes/UserRoutes.js';
import socket from './controllers/Socket.js';
import Room from './controllers/Room.js';
import { PORT } from './config.js'

connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


socket(io);
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));

/* ENDPOINTS */
app.get('/', (req, res) => {
    res.status(200).send({message:"Chat app!!"});
});

app.post('/test', async (req, res) => {
    // "62e621345912a57281945bb0"
    //const finded = await Room.deleteAllMessages("62e621345912a57281945bb0");
    //console.log(finded);
    res.status(200).send({message:"Test app!!", finded});
});

app.use('/', routes)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
