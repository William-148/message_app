
export default (state, action) => {
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
                messages: payload.messages,
                lastTimestamp: payload.lastTimestamp
            }
        case 'addMessage':
            return{
                ...state,
                messages: payload,
            }
        case 'lastTimestamp':
            return{
                ...state,
                lastTimestamp: payload
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
        case 'room':
            return {
                ...state,
                room: payload
            }
        default:
            return state;
    }
}