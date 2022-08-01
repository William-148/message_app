
import { useContext } from "react";
import Swal from 'sweetalert2';
import { BiPlusCircle, BiChevronsRight, BiMessageAltX } from "react-icons/bi";
import { Contact } from '../ChatElements';
import UserContext from "../../../Context/User/UserContext";
import ChatContext from "../../../Context/Chat/ChatContext";
import './SideBar.css';

export default function SideBar(){
    const { user } = useContext(UserContext);
    const {
        activeUsers, 
        rooms,
        selectRoom,
     } = useContext(ChatContext);

     const newRoom = async () => {
        const result = await Swal.fire({
            title: 'Room name',
            input: 'text',
            showCancelButton: true,
            width: 330
        });
        if(result.isConfirmed && result.value !== '')
            createRoom(result.value);
    }

    return (
        <>
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
                    <h3>Room</h3>
                    <span title="Create new room"
                        onClick={newRoom}
                    >
                        <BiPlusCircle/>
                    </span>
                </div>
                <ul className="rooms-list">
                    { rooms.length > 0 
                        ? (rooms.map((item) => (
                            <li key={item._id}
                                title="Select room?"
                                onClick={() => selectRoom(item)}
                            >
                                <span><BiChevronsRight/></span>
                                <h2>{item.name}</h2>
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
        </>
    )
}