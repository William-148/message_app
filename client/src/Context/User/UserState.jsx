import React, { useReducer } from "react";
import UserReducer from "./UserReducer";
import UserContext from "./UserContext";

const UserState = (props) => {
    const initialState = {
        user: null,
        socket: null
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const initSocket = (socket) => {
        dispatch({
            type: 'SOCKET',
            payload: socket
        });
    }
    
    const signin = (user) => {
        dispatch({
            type: 'SIGNIN',
            payload: user
        });
    }

    const signout = () => {
        if(!!state.socket) state.socket.disconnect();
        dispatch({
            type: 'SIGNOUT',
            payload: null
        });
    }

    const updateUser = (fields, callback) => {
        const userUpdated = {
            ...state.user,
            ...fields
        }
        dispatch({
            type: 'SIGNIN',
            payload: userUpdated
        });
        callback(userUpdated);
    }

    return (
        <UserContext.Provider value={{
            user: state.user,
            socket: state.socket,
            initSocket,
            signin,
            signout,
            updateUser
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;
