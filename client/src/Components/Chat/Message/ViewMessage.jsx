import { useEffect, useRef, useContext } from "react";
import { Message } from "../ChatElements";
import ChatContext from "../../../Context/Chat/ChatContext";
import UserContext from "../../../Context/User/UserContext";
import "./ViewMessage.css";
import { useState } from "react";

export default function ViewMessage() {

    const lastMessageRef = useRef();
    const { messages, requestOldMessages, room } = useContext(ChatContext);
    const { user } = useContext(UserContext);
    const [ isBottom, setIsBottom ] = useState(true);

    useEffect(()=>{
        if(isBottom) updateView();
    },[messages]);

    useEffect(() => setIsBottom(true), [room]);

    const updateView = () => {
        if(!!lastMessageRef) lastMessageRef.current.scrollIntoView(false);
    }

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        setIsBottom(false);
        if(scrollTop === 0) {
            e.currentTarget.scrollTop = 2;
            requestOldMessages();
            return;
        }
        const bottom = scrollTop + clientHeight - scrollHeight;
        if (bottom < 15 && bottom > -15 ) setIsBottom(true);
    } 

    const showMessages = () => {
        let current = '', date;
        return messages.map(
            (data) => {
                date = undefined;
                if(current !== data.date) 
                    current = date = data.date;
                return <div key={data._id} >
                    {!!date && <MessageDate date={date}/>}
                    <Message 
                        writter={data.writter}
                        data={data} 
                        isOwner={user._id === data.writterId}
                    />
                </div>
            }
        )
    }

    return (
        <section className="chat-message" onScroll={handleScroll}>
            <div className="message-content" ref={lastMessageRef} >
                {showMessages()}
            </div>
        </section>
    )
}

const MessageDate = ({date}) => {
    return (
        <div className="msg-date-content">
            <h2 className="msg-date">{date}</h2>
        </div>
    )
}