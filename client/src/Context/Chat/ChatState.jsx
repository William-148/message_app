import React, { useReducer, useEffect } from "react";
import ChatReducer from "./ChatReducer";
import ChatContext from "./ChatContext";

const ChatState = ({socket, user, children}) => {
    const initialState = {
        message: '',
        messages: [],
        activeUsers: [],
        room: undefined,
        rooms: []
    };

    const [state, dispatch] = useReducer(ChatReducer, initialState);

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

    const requestUsers = () => !!socket && socket.emit("request_users")

    const setMessage = (value) => {
        dispatch({type: 'message', payload: value});
    }

    const handleMessage = ({target:{value}}) => {
        const char = value.slice(-1);
        if(char === '\n'){
            sendMessage();
            return;
        }
        dispatch({type: 'message', payload: value});
    }

    const sendMessage = (event=null) => {
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


    return (
        <ChatContext.Provider value={{
            message: state.message,
            messages: state.messages,
            activeUsers: state.activeUsers,
            rooms: state.rooms,
            room: state.room,
            handleMessage,
            setMessage,
            sendMessage,
            createRoom,
            selectRoom,
            requestUsers
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatState;
