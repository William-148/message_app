// import Home from './views/Home/Home';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
  } from "react-router-dom";
import { useContext, useEffect } from "react";
import Signup from './views/Account/Signup';
import SignIn from "./views/Account/SignIn";
import Home from "./views/Home/Home";
import Inbox from "./views/Chat/Inbox";
import UserState from "./Context/User/UserState";
import UserContext from "./Context/User/UserContext";
import USER from "./Controllers/User";
import './App.css';

const Protected = ({element, isPublic}) => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    if(!!isPublic) return !!user ? <Navigate to="/desktop" state={location} replace /> : element;
    return !user ? <Navigate to="/" state={location} replace /> : element;
}

function App() {
    const { user, signin } = useContext(UserContext);

    useEffect(()=>{
        if(!!user) return;
        const itemUser = USER.getUser();
        if(!!itemUser) signin(itemUser);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <Protected isPublic element={ <SignIn/> }/>
                }/>
                <Route path="/signup" element={
                    <Protected isPublic element={ <Signup/> }/>
                }/>
                <Route path="/desktop" element={
                    <Protected element={<Home/>} />
                } >
                    <Route index  element={<div><h2>Init</h2></div>}/>
                    <Route path="inbox"  element={<Inbox />}/>
                    <Route path="settings"  element={<div><h1>Configuraciones</h1></div>}/>
                </Route>
                <Route path='*' element={<h1 style={{color:"#fff"}}>Not Found</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default () => {
    return (
        <UserState>
            <App/>
        </UserState>
    );
}
 