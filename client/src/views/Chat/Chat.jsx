import { useState, useEffect, useRef, useContext } from "react";
import Swal from 'sweetalert2';
import UserContext from "../../Context/User/UserContext";
import { BiHappyBeaming, BiRightArrowCircle, BiChat, 
    BiXCircle, BiPlusCircle, BiChevronsRight,
    BiMessageAltX 
} from "react-icons/bi";
import { Contact, Message } from './Components/ChatElements';
import Picker from "emoji-picker-react";

import './Chat.css'
// https://react-icons.github.io/react-icons/icons?name=bi

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

export default function Chat() {

    const { socket, user } = useContext(UserContext);
    const lastMessageRef = useRef();

    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState("");
    const [sidebarActive, setSidebarActive] = useState(true);
    const [messages, setMessages] = useState(messagesData);
    const [activeUsers, setActiveUsers] = useState([]);
    const [rooms, setRooms] = useState(listRoom);

    useEffect(() => {
        if(!!socket) socket.emit("request_users")
    }, []);

    useEffect(()=>{
        if (!!socket) socketHandler();
        updateView();
    },[messages, rooms, socket]);

    const socketHandler = () => {
        socket.on("getAllUsers", (users) => {
            setActiveUsers(users);
        });
        
        // Real time
        socket.on("updateUsers", (users) => {
            setActiveUsers(users);
        });
    }

    const updateView = () => {
        if(!!lastMessageRef) lastMessageRef.current.scrollIntoView(false);
    }

    const createRoom = async () => {
        const result = await Swal.fire({
            title: 'Room name',
            input: 'text',
            showCancelButton: true,
            confirmButtonClass: "btn-cnf",
            width: 330
        });
        if(result.isConfirmed){
            if(result.value !== '')
            Swal.fire({
                title: result.value,
                width: 250
            })
        }
    }

    const selectRoom = (selected) => {
        alert(selected);
    }

    const onEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji);
    }

    const handleMessage = (event) => {
        const text = event.target.value;
        const char = text.slice(-1);
        if(char === '\n'){
            sendMessage();
            return;
        }
        setMessage(text);
    }

    const sendMessage = (event=null) => {
        if(!!event)event.preventDefault();
        const current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        setMessages([
            ...messages, 
            { 
                msg:message, 
                time:`${hours}:${minutes < 10 ? `0${minutes}`: minutes}`, 
                isOwner:true
            }
        ]);
        setMessage('');
    }

    return (
        <div className="chat-container">
            <aside className={`chat-menu ${sidebarActive?'':'chat-menu-disabled'}`}>
                <header className="chat-profile">
                        <img src={!!user.photo
                                ? user.photo:"https://picsum.photos/150"
                            }
                            alt="image" 
                        />
                        <h3>{user.name}</h3>
                        <h4>@{user.nickname}</h4>
                </header>
                <section className="chat-contacts">
                    <div className="chat-members">
                        <h3>Active Users</h3>
                        <div className="members-list">
                            {activeUsers.map((contact) => 
                                contact.id !== user._id 
                                ?<Contact 
                                    key={contact.id}
                                    nickname={contact.nickname} 
                                    state={contact.state}
                                    profile={contact.photo}
                                />
                                : null 
                            )}
                        </div>
                    </div>
                    <div className="chat-rooms">
                        <div className="room-title">
                            <h3>Rooms</h3>
                            <span title="Create new room"
                                onClick={createRoom}
                            >
                                <BiPlusCircle/>
                            </span>
                        </div>
                        <ul className="rooms-list">
                            { rooms.length > 0 
                                ? (rooms.map((item, index) => (
                                    <li key={index}
                                        title="Select room?"
                                        onClick={() => selectRoom(item)}
                                    >
                                        <span><BiChevronsRight/></span>
                                        <h2>{item}</h2>
                                    </li>
                                )))
                                :(<li title="First create a room">
                                    <span><BiMessageAltX/></span>
                                    <h2>No rooms available!</h2>
                                </li>)
                            }
                        </ul>
                    </div>
                </section>
            </aside>
            <main className="principal-content">
                { showEmoji && <Picker onEmojiClick={onEmojiClick} pickerStyle={{position:"fixed"}}/> }
                { sidebarActive 
                    ? <BiXCircle className="btn-sidebar-chat" onClick={()=>setSidebarActive(false)}/> 
                    : <BiChat className="btn-sidebar-chat" onClick={()=>setSidebarActive(true)}/> 
                }
                <nav className="chat-status">
                    <h3>Room </h3>
                </nav>
                <section className="chat-message" >
                    <div className="message-content" ref={lastMessageRef} >
                        {messages.map((data, index) => (
                            <Message key={index} data={data}/>
                        ))}
                    </div>
                </section>
                <footer className="chat-input">
                    <div className="icon-option">
                        <BiHappyBeaming className="icon" onClick={()=>setShowEmoji(!showEmoji)} />
                    </div>
                    <form className="input-container" id="inputMessage" onSubmit={sendMessage}>
                        <textarea rows="2"
                            placeholder="Type here ..." 
                            required  
                            onChange={handleMessage}
                            value={message}
                        >
                        </textarea>
                        <button type="submit" form="inputMessage" className="btn-send" value="Submit" >
                            <BiRightArrowCircle/>
                        </button>
                    </form>
                </footer>
            </main>
        </div>
    );
}