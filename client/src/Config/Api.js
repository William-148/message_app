const BACKEND_HOST = import.meta.env.VITE_APP_BACKEND_URI || 'http://192.168.1.112:5000';
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID || "";

export default {
    HOST: BACKEND_HOST,
    AUTH:{
        signin: `${BACKEND_HOST}/signin`,
        signup: `${BACKEND_HOST}/signup`,
        update: `${BACKEND_HOST}/update`
    },
    GOOGLE:{
        clientId: CLIENT_ID
    }
}