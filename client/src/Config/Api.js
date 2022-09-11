const BACKEND_HOST = import.meta.env.VITE_APP_BACKEND_URI || 'http://192.168.1.103:5000';
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID || "";

export const HOST = BACKEND_HOST;

export const AUTH = {
    signin: `${BACKEND_HOST}/signin`,
    signup: `${BACKEND_HOST}/signup`,
    update: `${BACKEND_HOST}/update`
};

export const GOOGLE = {
    clientId: CLIENT_ID
}