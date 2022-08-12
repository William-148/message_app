import { useContext } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { BiEnvelope, BiKey } from "react-icons/bi";
import useForm from "../../Hooks/useForm";
import UserContext from "../../Context/User/UserContext";
import USER from "../../Controllers/User";
import FormInput from "./Components/FormInput";
import LoginGoogle from "../../Components/Authentication/LoginGoogle";
import Api from "../../Config/Api";
import './Account.css';
// https://react-icons.github.io/react-icons/icons?name=bi
const { GOOGLE } = Api;

export default function SignIn() {

    const { signin } = useContext(UserContext);
    const [ fields, fieldChange ] = useForm({ email: '', password: ''});

    const login = async (credentials) => {
        const {msg, data, success} = await USER.signIn(credentials);
        if(success) signin(data);
        else Swal.fire({
            text: msg,
            width: 300
        });
    }

    const loginHandler = (event) => {
        event.preventDefault();
        login(fields);
    }

    const responseGoogle = (res) => {
        const { email, googleId } = res.profileObj;
        login({ email, keyAuth: googleId });
    }

    return (
        <div className='login-component'>
            <div className="login-content">
                <aside>
                    <div className="logo-content">
                        <h1>Welcome</h1>
                        <p>Sign in to</p>
                        <p>continue access</p>
                    </div>
                </aside>
                <section>
                    <h2>Sign In</h2>
                    <form className='form' onSubmit={loginHandler}>
                        <FormInput
                            title="Email" placeholder='Email'
                            icon={<BiEnvelope className="input-icon"/>}
                            name="email" type="email"
                            value={fields.email}
                            onChange={fieldChange}
                            required autoFocus 
                        />
                        <FormInput
                            title="Password" placeholder='Password'
                            icon={<BiKey className="input-icon"/>}
                            name="password" type="password"
                            value={fields.password}
                            onChange={fieldChange}
                            required
                        />
                        <div className='input-button'>
                            <input type="submit" value="Login" />
                        </div>
                        <hr className="line" />
                        <footer>
                            <LoginGoogle
                                clientId={GOOGLE.clientId}
                                buttonText="Sign in with Google"
                                onSuccess={responseGoogle}
                                onFailure={(failure)=>console.error(failure)}
                                cookiePolicy={'single_host_origin'}
                            />
                            <div className="signup">
                                <Link to="/signup">Create an account</Link>
                            </div>
                        </footer>
                    </form>
                </section>
            </div>
        </div>
    );
}



 