import { useContext } from "react";
import { FaUserAlt, FaIdCard, FaEnvelope, FaExpeditedssl, FaLaugh } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import UserContext from "../../Context/User/UserContext";
import useForm from "../../Hooks/useForm";
import SettingInput from "../../Components/Input/SettingInput";
import USER from "../../Controllers/User";
import 'react-toastify/dist/ReactToastify.css';
import "./Settings.css";
// https://react-icons.github.io/react-icons/icons?name=fa

const profileInput = [
    {title: "Email", name:"email", disabled: true}, 
    {title: "Name", name:"name", protect:true },
    {title: "Password", name:"password", type:"password", minlength: 5, protect:true},
];

const chatSettings = [
    {title: "Nickname", name:"nickname", protect: true, maxlength: 20},
    {title: "State", name:"state", protect: true, maxlength: 30}
];

const iconList = {
    name: <FaUserAlt className="input-icon"/>,
    nickname: <FaIdCard className="input-icon"/>,
    email: <FaEnvelope className="input-icon"/>,
    password: <FaExpeditedssl className="input-icon"/>,
    password2: <FaExpeditedssl className="input-icon"/>,
    state: <FaLaugh className="input-icon"/>
}

const notifySetting = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export default function Settings() {

    const {user, updateUser} = useContext(UserContext);

    const initialState = {
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        state: user.state,
        password: '',
        password2: '',
    };

    const [fields, fieldChange] = useForm(initialState);

    /**
     * Shows an message
     * @param {string} msg 
     * @param {string} type values allowed: warn || success || error
     */
    const notify = (msg, type) => {
        switch(type){
            case 'warn':
                toast.warn(msg, notifySetting ); break;
            case 'success':
                toast.success(msg, notifySetting); break;
            case 'error':
                toast.error(msg, notifySetting); break;
            default:  
                toast(msg, notifySetting );
        }
    }

    /**
     * Check if input name is email
     * @param {String} name 
     * @returns boolean
     */
    const isEmail = (name) => {
        if(name !== 'email') return false;
        console.error("Email can not update.")
        return true;
    }

    /**
     * Update a field by specifying its name
     * @param {string} name 
     * @returns 
     */
    const editHandler = async (name) => {
        if(isEmail(name)) return;
        // Create data to update
        const userUpdate = { _id: user._id };
        userUpdate[name] = name === 'password' 
            ? fields[name] 
            : fields[name].trim();
        // Update form fields
        fieldChange({target:{name, value:userUpdate[name]}});
        // Update user
        const { success, msg } = await USER.update(userUpdate);
        if(success) updateUser(
            userUpdate, 
            (item) => USER.saveLocalUser(item)
        );
        // if is password, the field is cleared
        if(name === 'password') fieldChange({target:{name, value: ''}});
        // Show the result message
        notify(msg, success ? 'success' : 'error');
        console.log(msg);
    }

    const cancelHandler = (name) => {
        // Reset to the initial value of an specific field
        fieldChange({target:{name, value: initialState[name]}})
    }

    /**
     * Create all inputs from list that contains input attributes
     * @param {Array} inputList 
     * @returns {Array<SettingInput>} SettingInput element
     */
    const showInput = (inputList) => inputList.map(
        item =>
        <SettingInput key={item.name}
            {...item}
            icon={iconList[item.name]}
            value={fields[item.name]}
            onChange={fieldChange}
            onEdit={editHandler}
            onCancel={cancelHandler}
            notify={notify}
        />
    )

    return (
        <div className="setting-body">
            <section className="setting-container">
            <ToastContainer 
                closeOnClick 
                theme="dark"
                style={{width:280, marginLeft: 'auto'}}
            />
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