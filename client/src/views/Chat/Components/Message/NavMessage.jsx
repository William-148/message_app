import { useContext } from "react";
import { ChatContext } from "@/Context/Chat";
import { FaUsers } from "react-icons/fa";
import "./NavMessage.css";
// https://react-icons.github.io/react-icons/icons?name=bi

export default function NavMessage() {
    const { room } = useContext(ChatContext);

    return(
        <nav className="chat-status">
            <FaUsers className="room-icon"/>
            <h3> 
                {!!room ? `${room.name}`: 'Select a Room'}
            </h3>
        </nav>
    )
}