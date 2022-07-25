
export default (state, action) => {
    const {payload, type} = action;
    switch(type){
        case 'SIGNIN':
            return {
                ...state,
                user: payload
            }
        case 'SIGNOUT':
            return {
                ...state,
                user: null,
                socket: null
            }
        case 'SOCKET':
            return {
                ...state,
                socket: payload
            }
        default:
            return state;
    }
}