import { useEffect, useContext } from "react";
import { BiChat, BiXCircle } from "react-icons/bi";
import Picker from "emoji-picker-react";
import { ChatContext } from "@/Context/Chat";
import { useToggle } from "@/Hooks";
import { Waiting } from "./Components/Waiting";
import { SideBar } from "./Components/SideBar";
import { 
    ViewMessage, 
    InputMessage, 
    NavMessage 
} from "./Components/Message"
import './Chat.css'
// https://react-icons.github.io/react-icons/icons?name=bi

export default function Inbox() {
    const {
        room,
        message, 
        setMessage,
        requestUsers
     } = useContext(ChatContext);

    const [sidebarActive, setSidebarActive] = useToggle(true);
    const [showEmoji, setShowEmoji] = useToggle(false);

    useEffect(()=>{
        requestUsers();
    },[])

    const onEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji);
    }

    return (
        <div className="chat-container">
            <aside className={`chat-menu ${sidebarActive?'':'chat-menu-disabled'}`}>
                <SideBar />
            </aside>
            <main className="principal-content">
                { showEmoji && <Picker onEmojiClick={onEmojiClick} pickerStyle={{position:"fixed"}}/> }
                { sidebarActive 
                    ? <BiXCircle className="btn-sidebar-chat" onClick={setSidebarActive}/> 
                    : <BiChat className="btn-sidebar-chat" onClick={setSidebarActive}/> 
                }
                { !!room 
                    ?<>
                        <NavMessage />
                        <ViewMessage />
                        <InputMessage onClick={setShowEmoji}/>
                    </>
                    : <Waiting />
                }
            </main>
        </div>
    )
}