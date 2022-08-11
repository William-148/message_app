
import { useContext } from "react";
import Swal from 'sweetalert2';
import { FaUserTimes, FaUsersSlash, FaPlusCircle, FaCircleNotch } from "react-icons/fa";
import { Contact } from '../ChatElements';
import UserContext from "../../../Context/User/UserContext";
import ChatContext from "../../../Context/Chat/ChatContext";
import './SideBar.css';
// https://react-icons.github.io/react-icons/icons?name=fa

export default function SideBar(){
    const { user } = useContext(UserContext);
    const {
        activeUsers, 
        rooms,
        selectRoom,
        createRoom
     } = useContext(ChatContext);

    const existRoom = (name) => {
        const finded = rooms.filter(item=>item.name === name)[0];
        if(!finded) createRoom(name);
        else Swal.fire({
            title: 'Room already exist!',
            width: 330
        });
    }

     const newRoom = async () => {
        const result = await Swal.fire({
            text: 'Room Name',
            input: 'text',
            showCancelButton: true,
            width: 300
        });
        if(result.isConfirmed && result.value !== '')
            existRoom(result.value);
    }

    const showRooms = () => rooms.map(
        (item) => <li key={item._id}
                title="Select room?"
                onClick={() => selectRoom(item)}
            >
                <span><FaCircleNotch/></span>
                <h2>{item.name}</h2>
            </li>
    )
    
    const showContacts = () => activeUsers.map(
        (contact) => <Contact 
                key={contact.id}
                nickname={contact.nickname} 
                state={contact.state}
                profile={contact.photo}
            />
    )

    return (
        <>
        <header className="chat-profile">
            <Profile user={user}/>
        </header>
        <section className="chat-contacts">
            <div className="chat-members">
                <h3>Active Users</h3>
                <div className="members-list">
                    { activeUsers.length > 0
                      ? showContacts()
                      : <EmptyMessage 
                            icon={<FaUserTimes/>} 
                            message="No users actives!"
                        />
                    }
                </div>
            </div>
            <div className="chat-rooms">
                <div className="room-title">
                    <h3>Room</h3>
                    <span title="Create new room" onClick={newRoom}>
                        <FaPlusCircle/>
                    </span>
                </div>
                <ul className="rooms-list">
                    { rooms.length > 0 
                        ? showRooms()
                        :<EmptyMessage 
                            icon={<FaUsersSlash/>} 
                            message="No rooms available!"
                        />
                    }
                </ul>
            </div>
        </section>
        </>
    )
}

const Profile = ({user}) => {
    return <>
        <img src={ !!user.photo
                ? user.photo
                :"https://picsum.photos/150"
            }
            alt="image" 
        />
        <h3>@{user.nickname}</h3>
        <h4>{user.name}</h4>
    </>
}

const EmptyMessage = ({message,icon}) => {
    return <li title="First create a room">
        <span >{icon}</span>
        <h2>{message}</h2>
    </li>
}