import { useEffect, useReducer } from 'react';
import { reducer } from './chatReducer';

const messagesData = [
    {user:"Jhoel", msg:"hola estoy aqui", time:"12:20 p.m.", isOwner:true},
    {user:"Jhoel", msg:"hola estoy aqui", time:"12:20 p.m."},
    {user:"Jhoel", msg:"Hola este es un mensaje para decir que la lucha que se esta llevando a cabo no será en vano", time:"12:20 p.m.", isOwner:true},
    {user:"doxL011", msg:"hola estoy aqui", time:"12:20 p.m."},
    {user:"Jhoel", msg:"Este es otro mensaje para realizar un test", time:"12:20 p.m.", isOwner:true},
    {user:"paradox", msg:"hola estoy aqui", time:"12:20 p.m."}
];

const listRoom = [
    "News", "games", "music"
]

const useChat = (socket) => {

    const initialState = {
        message: '',
        messages: messagesData,
        activeUsers: [],
        rooms: listRoom
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(!!socket) socket.emit("request_users")
    }, []);

    useEffect(()=>{
        if (!!socket) listen();
    },[state.messages, state.rooms, socket]);

    const listen = () => {
        if(!socket) return;
        socket.on("getAllUsers", (users) => {
            dispatch({type: 'activeUsers', payload: users});
        });
        
        // Real time
        socket.on("updateUsers", (users) => {
            dispatch({type: 'activeUsers', payload: users});
        });
    }

    const handleMessage = ({target:{value}}) => {
        const char = value.slice(-1);
        if(char === '\n'){
            sendMessage();
            return;
        }
        dispatch({type: 'message', payload: value});
    }

    const sendMessage = (event) => {
        if(!!event)event.preventDefault();
        const current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        dispatch({
            type: 'messages',
            payload: [
                ...state.messages, 
                { 
                    msg: state.message, 
                    time:`${hours}:${minutes < 10 ? `0${minutes}`: minutes}`, 
                    isOwner:true
                }
            ]
        });
        dispatch({type: 'message', payload: ''});
    }

    return [
        state,
        dispatch,
        handleMessage,
        sendMessage
    ];
}

export default useChat;