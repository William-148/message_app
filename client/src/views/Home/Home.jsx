import Swal from 'sweetalert2';
import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaHtml5, FaBars, FaThLarge,
    FaCommentAlt, FaWrench, FaSignOutAlt
} from "react-icons/fa";
import { AsideLink } from "./Components/HomeElements";
import { UserContext } from "@/Context/User";
import { ChatState } from "@/Context/Chat";
import { useToggle } from "@/Hooks";
import { HOST } from "@/Config/Api";
import USER from "@/Controllers/User";
import './Home.css'
// https://react-icons.github.io/react-icons/icons?name=bi

const links = [
    { title: "Home", to: "", end:true, icon: <FaThLarge className="ico" />},
    { title: "Chat", to: "inbox", icon: <FaCommentAlt className="ico" /> },
    { title: "Setting", to: "settings", icon: <FaWrench className="ico" /> }
];

export default function Home() {

    const { socket, initSocket, user, signout } = useContext(UserContext);
    const [sidebarActive, setSidebarActive] = useToggle(false);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Init Socket connection
        initSocket(HOST);
        // Active sidebar depending windown's width
        if(window.innerWidth > 768) setSidebarActive();
        // Redirect to current route when the page is reload
        navigate(state?.state?.pathname ?? '/desktop')
    }, []);

    const logoutHandler = async () => {
        const result = await Swal.fire({
            text: "Do you want to logout?",
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
                        <FaHtml5 className="ico"/>
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
                        <button title="Log out" onClick={logoutHandler}>
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

