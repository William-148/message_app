import { useState, useEffect, useRef } from "react";
import { FaCuttlefish, FaBars, FaThLarge, FaSearch,FaRegUserCircle,
    FaRegCommentAlt, FaRegChartBar, FaRegFolder, FaShoppingCart,
    FaRegHeart, FaWrench, FaSignOutAlt
} from "react-icons/fa"
import './Chat.css'
// https://react-icons.github.io/react-icons/icons?name=bi
export default function Chat() {

    const [sidebarActive, setSidebarActive] = useState(true);

    const asideOptions = [
        { title: "Dashboard", icon: <FaThLarge className="ico" /> },
        { title: "Users", icon: <FaRegUserCircle className="ico" /> },
        { title: "Messages", icon: <FaRegCommentAlt className="ico" /> },
        { title: "Analytics", icon: <FaRegChartBar className="ico" /> },
        { title: "Files", icon: <FaRegFolder className="ico" /> },
        { title: "Order", icon: <FaShoppingCart className="ico" /> },
        { title: "Saved", icon: <FaRegHeart className="ico" /> },
        { title: "Setting", icon: <FaWrench className="ico" /> },
    ];

    const AsideLink = ({children, title}) => {
        return (
            <li>
                <a href="#">
                    {children}
                    <span className="links-name">{title}</span>
                </a>
                <span className="tooltip">{title}</span>
            </li>
        );
    }

    return (
        <>
            <aside className={`sidebar ${sidebarActive ? 'menu-active': ''}`}>
                <header className="logo-content">
                    <div className="logo">
                        <FaCuttlefish className="ico"/>
                        <div className="logo-name">Code</div>
                    </div>
                    <FaBars id="btn-menu" onClick={() => { setSidebarActive(!sidebarActive)}}/>
                </header>
                <ul className="navlist">
                    <li>
                        <a href="#">
                            <FaSearch className="ico-search"/>
                            <input type="text" placeholder="Search ..." />
                        </a>
                        <span className="tooltip">Search</span>
                    </li>
                    {asideOptions.map((item,index) => <AsideLink key={index} title={item.title}>{item.icon}</AsideLink>)}
                </ul>
                <footer className="profile-content">
                    <div className="profile">
                        <div className="profile-details">
                            <img src="https://picsum.photos/100" alt="image" />
                            <div className="name-job">
                                <div className="name">Jhoel Moreno</div>
                                <div className="job">Developer</div>
                            </div>
                        </div>
                        <FaSignOutAlt id="logout"/>
                    </div>
                </footer>
            </aside>
            <main className="home-content">
                <h1 className="text">Contenido</h1>
            </main>
        </>
    )
}