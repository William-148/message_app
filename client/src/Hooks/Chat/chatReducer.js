
export const reducer = (state, action) => {
    const {payload, type} = action;
    switch(type){
        case 'message':
            return {
                ...state,
                message: payload
            }
        case 'messages':
            return{
                ...state,
                messages: payload
            }
        case 'activeUsers':
            return {
                ...state,
                activeUsers: payload
            }
        case 'rooms':
            return {
                ...state,
                rooms: payload
            }
        default: return state;
    }
}