import { useState, useContext, useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import io from "socket.io-client";
import Swal from 'sweetalert2';
import { FaCuttlefish, FaBars, FaThLarge, FaRegUserCircle,
    FaRegCommentAlt, FaRegChartBar, FaRegFolder,
    FaRegHeart, FaWrench, FaSignOutAlt
} from "react-icons/fa";
import UserContext from "../../Context/User/UserContext";
import USER from "../../Controllers/User";
import Api from "../../Config/Api";
import './Home.css'
const { HOST } = Api;
// https://react-icons.github.io/react-icons/icons?name=bi

export default function Home() {
    const asideOptions = [
        { title: "Dashboard", route: "init", icon: <FaThLarge className="ico" />, active:true },
        { title: "Chat", route: "inbox", icon: <FaRegCommentAlt className="ico" /> },
        { title: "Setting", route: "settings", icon: <FaWrench className="ico" /> },
        // { title: "Users", route: "init", icon: <FaRegUserCircle className="ico" /> },
        // { title: "Analytics", route: "init", icon: <FaRegChartBar className="ico" /> },
        // { title: "Files", route: "init", icon: <FaRegFolder className="ico" /> },
        // { title: "Saved", route: "init", icon: <FaRegHeart className="ico" /> },
    ];

    const { socket, initSocket, user, signout } = useContext(UserContext);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [links, setLinks] = useState(asideOptions);

    useEffect(() => {
        if(!socket) initSocket(io(HOST));
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

    const setActive = (position) => {
        const data = links.map((item, index) => {
            item['active'] = (position === index) ? true: false ;
            return item;
        });
        setLinks(data);
    }

    return (
        <>
            <aside className={`sidebar ${sidebarActive ? 'menu-active': ''}`}>
                <nav className="logo-content">
                    <div className="logo">
                        <FaCuttlefish className="ico"/>
                        <div className="logo-name">Code</div>
                    </div>
                    <FaBars id="btn-menu" onClick={() => setSidebarActive(!sidebarActive)}/>
                </nav>
                <ul className="navlist">
                    {links.map((item,index) => (
                        <AsideLink key={index} 
                            title={item.title} 
                            route={item.route}
                            active={item.active}
                            onClick={()=>setActive(index)}
                        >
                            {item.icon}
                        </AsideLink>
                    ))}
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
                <Outlet />
            </section>
        </>
    );    
}

const AsideLink = (props) => {
    const background = { background:"#00000040" }
    return (
        <li style={props.active?background:{}} >
            <Link to={props.route} onClick={props.onClick}>
                {props.children}
                <span className="links-name">{props.title}</span>
            </Link>
        </li>
    );
}