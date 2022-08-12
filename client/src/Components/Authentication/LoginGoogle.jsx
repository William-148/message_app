import { useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const LoginGoogle = ({clientId, ...props}) => {
    useEffect(()=> {
        const initClient = () => {
            gapi.client.init({
            clientId,
            scope: ''
          });
       };
       gapi.load('client:auth2', initClient);
    }, [])

    return (
        <div className="login-g">
            <GoogleLogin
                clientId={clientId}
                {...props}
            />
        </div>
    )
}

export default LoginGoogle;