// import Home from './views/Home/Home';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { useContext, useEffect } from "react";
import Signup from './views/Account/Signup';
import SignIn from "./views/Account/SignIn";
import Home from "./views/Home/Home";
import Chat from "./views/Chat/Chat";
import UserState from "./Context/User/UserState";
import UserContext from "./Context/User/UserContext";
import USER from "./Controllers/User";
import './App.css';

function App() {

    const { user, signin } = useContext(UserContext);

    useEffect(() => {
        isLoggedIn();
    }, []);

    const isLoggedIn = () => {
        if(!!user) return;
        const itemUser = USER.getUser();
        if(!!itemUser) signin(itemUser);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    !!user 
                    ? <Navigate to="/desktop/init" replace /> 
                    : <SignIn/>
                }/>
                <Route path="/signup" element={
                    !!user 
                    ? <Navigate to="/desktop/init" replace /> 
                    : <Signup/>
                }/>
                <Route path="/desktop/" element={
                    !user 
                    ? <Navigate to="/" replace /> 
                    : <Home/>
                } >
                    <Route path="init"  element={<div><h2>Init</h2></div>}/>
                    <Route path="inbox"  element={<Chat />}/>
                    <Route path="settings"  element={<div><h1>Configuraciones</h1></div>}/>
                </Route>
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
 