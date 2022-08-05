import { useContext } from "react";
import { FaUserAlt, FaIdCard, FaEnvelope, FaExpeditedssl, FaLaugh } from "react-icons/fa";
import UserContext from "../../Context/User/UserContext";
import useForm from "../../Hooks/useForm";
import SettingInput from "../../Components/Input/SettingInput";
import "./Settings.css";
// https://react-icons.github.io/react-icons/icons?name=fa

const profileInput = [
    {title: "Email:", name:"email", disabled: true}, 
    {title: "Name:", name:"name", protect:true },
    {title: "Password:", name:"password", type:"password"},
    {title: "Repeat Password:", name:"password2", type:"password"}
];

const chatSettings = [
    {title: "Nickname:", name:"nickname", protect: true},
    {title: "State:", name:"state", protect: true}
];

const iconList = {
    name: <FaUserAlt className="input-icon"/>,
    nickname: <FaIdCard className="input-icon"/>,
    email: <FaEnvelope className="input-icon"/>,
    password: <FaExpeditedssl className="input-icon"/>,
    password2: <FaExpeditedssl className="input-icon"/>,
    state: <FaLaugh className="input-icon"/>
}

export default function Settings() {

    const {user} = useContext(UserContext);

    const initialState = {
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        state: user.state,
        password: '',
        password2: '',
    };

    const [fields, fieldChange] = useForm(initialState);

    const editHandler = (name) => {
        if(name === 'email') {
            console.error("Email can not update.")
            return;
        }
        console.log(fields[name]);
    }

    const cancelHandler = (name) => {
        fieldChange({target:{name, value: initialState[name]}})
    }

    const showInput = (inputList) => inputList.map(
        item =>
        <SettingInput key={item.name}
            {...item}
            icon={iconList[item.name]}
            value={fields[item.name]}
            onChange={fieldChange}
            onEdit={editHandler}
            onCancel={cancelHandler}
        />
    )

    return (
        <div className="setting-body">
            <section className="setting-container">
                <div className="setting-title">
                    <h1>Profile</h1>
                </div>
                <div className="setting-content">
                    <div className="img-container">
                        <img src={user.photo} alt="image"/>
                    </div>
                    <form >{showInput(profileInput)}</form>
                </div>

                <div className="setting-title">
                    <h1>Chat Settings</h1>
                </div>
                <div className="setting-content">
                    <form>{showInput(chatSettings)}</form>
                </div>
            </section>
        </div>
    )
}