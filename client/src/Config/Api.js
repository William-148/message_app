const BACKEND_HOST = import.meta.env.VITE_APP_BACKEND_URI || 'http://192.168.1.107:5000';

export default {
    HOST: BACKEND_HOST,
    AUTH:{
        signin: `${BACKEND_HOST}/signin`,
        signup: `${BACKEND_HOST}/signup`,
        update: `${BACKEND_HOST}/update`
    }
}