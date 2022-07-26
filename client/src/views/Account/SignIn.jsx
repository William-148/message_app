import { useContext } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { BiEnvelope, BiKey } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import useForm from "../../Hooks/useForm";
import UserContext from "../../Context/User/UserContext";
import USER from "../../Controllers/User";
import FormInput from "./Components/FormInput";
import './Account.css';
// https://react-icons.github.io/react-icons/icons?name=bi


export default function SignIn() {

    const { signin } = useContext(UserContext);
    const [ fields, fieldChange ] = useForm({ email: '', password: ''});

    const login = async (event) => {
        event.preventDefault();
        const {msg, data, success} = await USER.signIn(fields);
        if(success) signin(data);
        else Swal.fire({
            title: msg,
            width: 300
        });;
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
                    <form className='form' onSubmit={login}>
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
                            <button className="login-g" type="button">
                                <FcGoogle/>
                                <p>Sign in with Google</p>
                            </button>
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

 