import { useEffect, useRef, useContext } from "react";
import { Message } from "../ChatElements";
import ChatContext from "../../../Context/Chat/ChatContext";
import UserContext from "../../../Context/User/UserContext";
import "./ViewMessage.css";

const MessageDate = ({date}) => {
    return (
        <div className="msg-date-content">
            <h2 className="msg-date">{date}</h2>
        </div>
    )
}


export default function ViewMessage() {

    const { messages } = useContext(ChatContext);
    const { user } = useContext(UserContext);

    const lastMessageRef = useRef();

    useEffect(()=>{
        updateView();
    },[messages]);

    const updateView = () => {
        if(!!lastMessageRef) lastMessageRef.current.scrollIntoView(false);
    }
    
    const showMessages = () =>{
        let writter = '', current = '';
        return messages.map((data, index) => {
            writter = undefined;
            if(!data.date && current !== data.writter){
                current = writter = data.writter;
            } 
            return !data.date ?
                <Message key={!!data._id ? data._id : index} 
                    writter={writter}
                    data={data} 
                    isOwner={user._id === data.writterId}
                />
            : <MessageDate key={index} date={data.date}/>
        })
    }

    return (
        <section className="chat-message" >
            <div className="message-content" ref={lastMessageRef} >
                {showMessages()}
            </div>
        </section>
    )
}