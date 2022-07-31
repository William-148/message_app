import { useEffect, useReducer } from 'react';
import { reducer } from './chatReducer';

const messagesData = [
    {_id:"1", writterId:"1", writter:"Jhoel", message:"hola estoy aqui", time:"12:20 p.m.", date: "Today"},
    {_id:"2", writterId:"2", writter:"Jhoel", message:"hola estoy aqui", time:"12:20 p.m."},
    {_id:"3", writterId:"3", writter:"Jhoel", message:"Hola este es un mensaje para decir que la lucha que se esta llevando a cabo no será en vano", time:"12:20 p.m.", isOwner:true},
    {_id:"4", writterId:"4", writter:"doxL011", message:"hola estoy aqui", time:"12:20 p.m."},
    {_id:"5", writterId:"5", writter:"Jhoel", message:"Este es otro mensaje para realizar un test", time:"12:20 p.m.", isOwner:true},
    {_id:"6", writterId:"6", writter:"paradox", message:"hola estoy aqui", time:"12:20 p.m."}
];

const useChat = (socket) => {

    const initialState = {
        message: '',
        messages: messagesData,
        activeUsers: [],
        room: undefined,
        rooms: []
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(!!socket) socket.emit("request_users")
    }, []);

    useEffect(()=>{
        if (!socket) return;
        socket.on("disconnect", () => {
            socket.disconnect();
        });

        socket.on("getAllUsers", (users) => {
            dispatch({type: 'activeUsers', payload: users});
        });
        
        // Real time
        socket.on("updateUsers", (users) => {
            dispatch({type: 'activeUsers', payload: users});
        });
        
        socket.on("srv:get_room", (room) => {
            dispatch({
                type: 'rooms',
                payload: [...rooms, room]
            });
        });

        // Real time
        socket.on("srv:updateRooms", (rooms) => {
            dispatch({
                type: 'rooms',
                payload: rooms
            });
        });

        socket.on("srv:getCurrentMsg", (msgs) => {
            dispatch({
                type: 'messages',
                payload: msgs
            });
        });

        socket.on("srv:chat", (msg) => {
            dispatch({
                type: 'messages',
                payload: [
                    ...state.messages,
                    msg
                ]
            });
        });

    },[state.messages, state.rooms, socket]);

    const handleMessage = ({target:{value}}) => {
        const char = value.slice(-1);
        if(char === '\n'){
            sendMessage();
            return;
        }
        dispatch({type: 'message', payload: value});
    }

    const sendMessage = (event, user) => {
        if(!!event)event.preventDefault();
        const current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        const newMsg = {
            roomId: state.room._id,
            writterId: user._id, 
            writter: user.nickname, 
            message: state.message, 
            time:`${hours}:${minutes < 10 ? `0${minutes}`: minutes}`
        }
        /*
        dispatch({ type: 'messages',  payload: [
                ...state.messages,
                newMsg
            ]
        });
        */
        socket.emit('cl:message', newMsg)
        dispatch({type: 'message', payload: ''});
    }

    const createRoom = (name) => {
        socket.emit('cl:create_room', name);
        socket.on('get_room', (room) => {
            dispatch({
                type: 'rooms',
                payload: [...state.rooms, room]
            });
            dispatch({
                type: "messages",
                payload: []
            });
        });
    }

    const selectRoom = (room) => {
        socket.emit('cl:join_room', room._id);
        dispatch({
            type:"room",
            payload: room
        });
    }

    return [
        state,
        dispatch,
        handleMessage,
        sendMessage,
        createRoom,
        selectRoom
    ];
}

export default useChat;