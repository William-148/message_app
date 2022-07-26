import { useEffect, useRef, useContext } from "react";
import { Message } from "../ChatElements";
import { ChatContext } from "@/Context/Chat";
import { UserContext } from "@/Context/User";
import "./ViewMessage.css";

export default function ViewMessage() {

    const lastMessageRef = useRef();
    const isBottom  = useRef(true);
    const { messages, requestOldMessages, room } = useContext(ChatContext);
    const { user } = useContext(UserContext);

    useEffect(()=>{
        if(isBottom.current) updateView();
    },[messages]);

    useEffect(() =>{ isBottom.current = true }, [room]);

    const updateView = () => {
        if(!!lastMessageRef) lastMessageRef.current.scrollIntoView(false);
    }

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        isBottom.current = false;
        if(scrollTop === 0) {
            e.currentTarget.scrollTop = 2;
            requestOldMessages();
            return;
        }
        const bottom = scrollTop + clientHeight - scrollHeight;
        if (bottom < 15 && bottom > -15 ) isBottom.current = true;
    } 

    const showMessages = () => {
        let current = '', date;
        return messages.map(
            (data) => {
                date = undefined;
                if(current !== data.date) current = date = data.date;
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