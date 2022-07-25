import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BiEnvelope, BiKey } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import UserContext from "../../Context/User/UserContext";
import USER from "../../Controllers/User";
import './Account.css';
// https://react-icons.github.io/react-icons/icons?name=bi


export default function SignIn() {

    const { signin } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (event) => {
        event.preventDefault();
        const {msg, data} = await USER.signIn(email, password);
        if(!!data) signin(data);
        else alert(msg);
    }

    return (
        <>  
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
                            <div className="input-content">
                                <h4>Email</h4>
                                <div className="input">
                                    <BiEnvelope className="input-icon"/>
                                    <input type="email" 
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        required 
                                        placeholder='Email'
                                        autoFocus 
                                    />
                                </div>
                            </div>
                            <div className="input-content">
                                <h4>Password</h4>
                                <div className="input">
                                    <BiKey className="input-icon"/>
                                    <input type="password" 
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        required 
                                        placeholder='Password'
                                        />
                                </div>
                            </div>
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
        </>
    );
}

 