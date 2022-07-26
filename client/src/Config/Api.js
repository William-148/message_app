//const BACKEND_HOST = 'http://192.168.1.112:5000';
const BACKEND_HOST = 'https://backend-message-app.herokuapp.com';

export default {
    HOST: BACKEND_HOST,
    AUTH:{
        signin: `${BACKEND_HOST}/signin`,
        signup: `${BACKEND_HOST}/signup`
    }
}