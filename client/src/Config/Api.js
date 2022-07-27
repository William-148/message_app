const BACKEND_HOST = import.meta.env.VITE_APP_BACKEND_URI || 'http://192.168.1.112:5000';
console.log("Import", import.meta.env.VITE_APP_BACKEND_URI);
console.log("cosntat", BACKEND_HOST)

export default {
    HOST: BACKEND_HOST,
    AUTH:{
        signin: `${BACKEND_HOST}/signin`,
        signup: `${BACKEND_HOST}/signup`
    }
}