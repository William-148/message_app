import React from "react";
import { Link } from "react-router-dom";
import { BiEnvelope, BiKey, BiRename, BiUser, BiIdCard } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import useForm from "../../Hooks/useForm";
import FormInput from "./Components/FormInput";
import Swal from 'sweetalert2';
import USER from "../../Controllers/User";
import './Account.css';
// https://react-icons.github.io/react-icons/icons?name=bi

const Signup = () => {

    const initialState = { 
        name: '', 
        nickname: '',
        email: '',
        password: '',
        password2: ''
    };
    const [fields, fieldChange, resetFields] = useForm(initialState);

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
    
    const login = async (event) => {
        event.preventDefault();
        const { password2, ...user} = fields;
        if(user.password !== password2){
            Swal.fire({
                title: 'Password are differents.',
                width: 300
            });
            return;
        }
        
        const { msg, success } = await USER.signUp(user);
        if(success) resetFields();
        Swal.fire({
            title: msg,
            width: 300
        });
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
                    <form className='form' onSubmit={login}>
                        {createFields()}
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
    );
}

 export default Signup;