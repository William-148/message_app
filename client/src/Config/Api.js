const BACKEND_HOST = process.env.HOST || 'http://192.168.1.112:5000';

export default {
    HOST: BACKEND_HOST,
    AUTH:{
        signin: `${BACKEND_HOST}/signin`,
        signup: `${BACKEND_HOST}/signup`
    }
}