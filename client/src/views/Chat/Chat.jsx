import { useEffect, useRef, useContext } from "react";
import Swal from 'sweetalert2';
import { BiHappyBeaming, BiRightArrowCircle, BiChat, 
    BiXCircle, BiPlusCircle, BiChevronsRight,
    BiMessageAltX 
} from "react-icons/bi";
import { Contact, Message } from './Components/ChatElements';
import UserContext from "../../Context/User/UserContext";
import useToggle from "../../Hooks/useToggle";
import useChat from "../../Hooks/Chat/useChat";
import Picker from "emoji-picker-react";

import './Chat.css'
// https://react-icons.github.io/react-icons/icons?name=bi

export default function Chat() {

    const { socket, user } = useContext(UserContext);
    const lastMessageRef = useRef();

    const [sidebarActive, setSidebarActive] = useToggle(true);
    const [showEmoji, setShowEmoji] = useToggle(false);

    const [
        {message, messages, activeUsers, rooms}, 
        dispatch, 
        handleMessage, 
        sendMessage 
    ] = useChat(socket);

    useEffect(()=>{
        updateView();
    },[messages]);

    const updateView = () => {
        if(!!lastMessageRef) lastMessageRef.current.scrollIntoView(false);
    }

    const createRoom = async () => {
        const result = await Swal.fire({
            title: 'Room name',
            input: 'text',
            showCancelButton: true,
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
        dispatch({
            type: "message",
            payload: message + emojiObject.emoji
        });
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
                    ? <BiXCircle className="btn-sidebar-chat" onClick={setSidebarActive}/> 
                    : <BiChat className="btn-sidebar-chat" onClick={setSidebarActive}/> 
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
                        <BiHappyBeaming className="icon" onClick={setShowEmoji} />
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