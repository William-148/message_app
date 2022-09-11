import React from "react";
import { Link } from "react-router-dom";
import { BiEnvelope, BiKey, BiRename, BiUser, BiIdCard } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from "@/Hooks";
import USER from "@/Controllers/User";
import FormInput from "./Components/FormInput";
import LoginGoogle from "./Components/LoginGoogle";
import './Account.css';
// https://react-icons.github.io/react-icons/icons?name=bi

const inputList = [
    {title: "Name:", name:"name", autoFocus:true},
    {title: "Nickname:", name:"nickname"},
    {title: "Email:", name:"email", type:"email"},
    {title: "Password:", name:"password", type:"password"},
    {title: "Repeat Password:", name:"password2", type:"password"}
];

const iconList = {
    name: <BiUser className="input-icon"/>,
    nickname: <BiIdCard className="input-icon"/>,
    email: <BiEnvelope className="input-icon"/>,
    password: <BiKey className="input-icon"/>,
    password2: <BiRename className="input-icon"/>
}

const SignUp = () => {

    const initialState = { 
        name: '', 
        nickname: '',
        email: '',
        password: '',
        password2: ''
    };
    const [fields, fieldChange, resetFields] = useForm(initialState);
    const navigate = useNavigate();

    const signup = async (data) => {
        const { msg, success } = await USER.signUp(data);
        if(success) resetFields();
        Swal.fire({
            text: msg,
            width: 300
        });
        if(success) navigate('/')
    }

    const responseGoogle = (res) => {
        const { email, name, imageUrl, googleId, givenName } = res.profileObj;
        const user = {
            name: givenName,
            nickname: givenName,
            email,
            password: googleId,
            keyAuth: googleId,
            photo: imageUrl
        }
        signup(user);
    }
    
    const signupHandler = async (event) => {
        event.preventDefault();
        const { password2, ...user} = fields;
        if(user.password !== password2){
            Swal.fire({
                title: 'Password are differents.',
                width: 300
            });
            return;
        }
        signup(user);
    }

    const createFields = () => {
        return inputList.map((item, index) =>
            <FormInput key={index} 
                {...item}
                icon={iconList[item.name]}
                value={fields[item.name]}
                onChange={fieldChange}
                required
            />
        )
    }

    return (
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
                    <form className='form' onSubmit={signupHandler}>
                        {createFields()}
                        <div className='input-button'>
                            <input type="submit" value="Sign Up" />
                        </div>
                        <hr className="line" />
                        <footer>
                            <LoginGoogle
                                clientId={GOOGLE.clientId}
                                buttonText="Sign up with Google"
                                onSuccess={responseGoogle}
                                onFailure={(failure)=>console.error(failure)}
                                cookiePolicy={'single_host_origin'}
                            />
                            <div className="signup">
                                <Link to="/">Sign In</Link>
                            </div>
                        </footer>
                    </form>
                </section>
            </div>
        </div>
    );
}

 export default SignUp;