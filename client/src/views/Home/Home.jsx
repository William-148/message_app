import io from "socket.io-client";
import Swal from 'sweetalert2';
import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaCuttlefish, FaBars, FaThLarge,
    FaRegCommentAlt, FaWrench, FaSignOutAlt
} from "react-icons/fa";
import { AsideLink } from "./Components/HomeElements";
import UserContext from "../../Context/User/UserContext";
import ChatState from "../../Context/Chat/ChatState";
import useToggle from "../../Hooks/useToggle";
import USER from "../../Controllers/User";
import Api from "../../Config/Api";
import './Home.css'
const { HOST } = Api;
// https://react-icons.github.io/react-icons/icons?name=bi

const links = [
    { title: "Home", to: "", end:true, icon: <FaThLarge className="ico" />},
    { title: "Chat", to: "inbox", icon: <FaRegCommentAlt className="ico" /> },
    { title: "Setting", to: "settings", icon: <FaWrench className="ico" /> }
];

export default function Home() {

    const { socket, initSocket, user, signout } = useContext(UserContext);
    const [sidebarActive, setSidebarActive] = useToggle(false);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!socket) initSocket(io(HOST));
        if(window.innerWidth > 768) setSidebarActive();
        // Redirect to current route when the page is reload
        navigate(state?.state?.pathname ?? '/desktop')
    }, []);

    useEffect(() => {
        if (!!socket) socketStart();
    }, [socket]);

    const socketStart = () => {
        socket.on("me", (id) => {
            socket.emit('new_user', {
                id: user._id,
                socket: id,
                nickname: user.nickname,
                state: user.state,
                photo: user.photo
            });
        });
    }

    const logout = async () => {
        const result = await Swal.fire({
            title: 'Do you want to logout?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            width: 250
        });
        if (result.isConfirmed) {
            signout();
            USER.removeUser();
        }
    }

    const asideLinks = () => {
        return links.map((item,index) => (
            <li key={index}>
                <AsideLink {...item}/>
            </li>
        ));
    }
    return (
        <>
            <aside className={`sidebar ${sidebarActive ? 'menu-active': ''}`}>
                <nav className="logo-content">
                    <div className="logo">
                        <FaCuttlefish className="ico"/>
                        <div className="logo-name">Code</div>
                    </div>
                    <FaBars id="btn-menu" onClick={setSidebarActive}/>
                </nav>
                <ul className="navlist">
                    { asideLinks() }
                </ul>
                <footer className="profile-content">
                    <div className="profile">
                        <div className="profile-details">
                            <img src={!!user.photo 
                                    ? user.photo
                                    :"https://picsum.photos/100"
                                } 
                                alt="image" 
                            />
                            <div className="name-job">
                                <div className="name">{user.name}</div>
                                <div className="job">Admin</div>
                            </div>
                        </div>
                        <button title="Log out" onClick={logout}>
                            <FaSignOutAlt id="logout"/>
                        </button>
                    </div>
                </footer>
            </aside>
            <section className="home-content">
                {/* Background:  https://www.svgbackgrounds.com/*/}
                <ChatState socket={socket} user={user}>
                    <Outlet />
                </ChatState>
            </section>
        </>
    );    
}

