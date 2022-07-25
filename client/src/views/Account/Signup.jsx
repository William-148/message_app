import { useState } from "react";
import { Link } from "react-router-dom";
import { BiEnvelope, BiKey, BiRename, BiUser, BiIdCard } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc"
import './Account.css';
// https://react-icons.github.io/react-icons/icons?name=bi

export default function Signup() {

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const login = (event) => {
        event.preventDefault();
        if(password !== password2) alert("Password are different!!");
        const user = {
            name,
            nickname,
            email,
            password,
            toString: function () { return  this.name + "- " + this.nickname + "- " + this.email + "- " + this.password }
        }
        alert(''+user);
        console.log(user)
    }

    return (
        <>  
            <div className='login-component'>
                <div className="login-content">
                    <aside>
                        <div className="logo-content">
                            <h1>Welcome</h1>
                            <p>Create an account</p>
                            <p>to get access</p>
                        </div>
                    </aside>
                    <section>
                        <h2>Sign Up</h2>
                        <form className='form' onSubmit={login}>
                            <div className="input-content">
                                <h4>Name</h4>
                                <div className="input">
                                    <BiUser className="input-icon"/>
                                    <input type="text" 
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                        required 
                                        autoFocus 
                                    />
                                </div>
                            </div>
                            <div className="input-content">
                                <h4>Nickname</h4>
                                <div className="input">
                                    <BiIdCard className="input-icon"/>
                                    <input type="text" 
                                        value={nickname}
                                        onChange={(e)=>setNickname(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="input-content">
                                <h4>Email</h4>
                                <div className="input">
                                    <BiEnvelope className="input-icon"/>
                                    <input type="email" 
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        required 
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
                                        />
                                </div>
                            </div>
                            <div className="input-content">
                                <h4>Repeat Password</h4>
                                <div className="input">
                                    <BiRename className="input-icon"/>
                                    <input type="password" 
                                        value={password2}
                                        onChange={(e)=>setPassword2(e.target.value)}
                                        required 
                                        />
                                </div>
                            </div>

                            <div className='input-button'>
                                <input type="submit" value="Sign Up" />
                            </div>
                            <hr className="line" />
                            <footer>
                                <button className="login-g" type="button">
                                    <FcGoogle/>
                                    <p>Sign up with Google</p>
                                </button>
                                <div className="signup">
                                    <Link to="/">Sign In</Link>
                                </div>
                            </footer>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

 