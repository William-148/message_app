import { useContext } from "react";
import { BiHappyBeaming, BiRightArrowCircle } from "react-icons/bi";
import { ChatContext } from "@/Context/Chat";
import "./InputMessage.css";

export default function InputMessage({onClick}) {

    const {
        message, 
        handleMessage, 
        sendMessage
    } = useContext(ChatContext);

    return (
        <footer className="chat-input">
            <div className="icon-option">
                <BiHappyBeaming className="icon" onClick={onClick} />
            </div>
            <form className="input-container" id="inputMessage" 
                onSubmit={sendMessage}
            >
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
    )
}