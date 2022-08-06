import { useRef, useEffect, useState } from "react";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import useInputEdit from "../../Hooks/useInputEdit";

import "./SettingInput.css"

const SettingInput = ({title, icon, name, protect, disabled, onEdit, onCancel, minlength, maxlength, onChange, notify, ...inputProps}) => {

    const [showEditIcon, showButtons, toggleEdit] = useInputEdit(protect);
    const [password2, setPassword2] = useState('');
    const inputRef = useRef();

    useEffect(()=> {
        if(!!inputRef.current && !showEditIcon && protect) {
            inputRef.current.focus();
        }
    }, [showEditIcon]);

    //#region VALIDATE FIELDS
    
    const isPassword = () => inputProps.type === 'password';

    const isValidPassword = () => {
        if(!isPassword()) return true;
        if(inputRef.current.value === password2) return true;
        if(!!notify) notify("Password aren't equals.");
        return false;
    }

    const isEmpty = () => {
        if(inputProps.value !== '') return false;
        if(!!notify) notify(`${title} are required.`);
        return true;
    }

    const lengthRequired = () => {
        if(!minlength) return true;
        if(inputProps.value.length >= minlength) return true;
        if(!!notify) notify(`${title} requires at least ${minlength} characters.`);
        return false;
    }
    //#endregion

    const handleChange = (e) => {
        if(!!maxlength)
        if(e.target.value.length > maxlength) return;
        if(!!onChange) onChange(e);
    }

    const editEvent = () => {
        // Validate Fields
        if(isEmpty()) return;
        if(!isValidPassword()) return;
        if(!lengthRequired()) return;
        setPassword2('')
        // Execute Callback
        if(!!onEdit) onEdit(name);
        toggleEdit();
    }

    const cancelEvent = () => {
        setPassword2('');
        if(!!onCancel) onCancel(name);
        toggleEdit();
    }

    const showRepeatPassword = () => (
        <div  className={`setting-input ${showButtons ? '': 'button-hidden'}`}>
            {!!icon ? icon : null }
            <input type="password" 
                placeholder="Repeat password"
                value={password2}
                onChange={({target}) => {
                    setPassword2(target.value);
                }}
            />
        </div>
    )

    return (
        <div className="setting-input-content">
            <label htmlFor={name}>{title}</label>
            <div className="setting-input">
                {!!icon ? icon : null }
                <input name={name} id={name} 
                    disabled={showEditIcon || disabled}
                    onChange={handleChange}
                    {...inputProps}
                    ref={inputRef}
                />
                <button type="button" onClick={toggleEdit} 
                    className={`${showEditIcon ? '' : 'button-hidden'}`}
                >
                    <FaPencilAlt className="input-icon edit-icon"/> 
                </button>
            </div>
            { isPassword() && showRepeatPassword() }
            <div className={`button-accept ${showButtons ? '': 'button-hidden'}`} >
                <button type="button" onClick={editEvent}>
                    <FaCheck className="input-icon edit-icon"/> 
                </button>
                <button type="button" onClick={cancelEvent}>
                    <FaTimes className="input-icon edit-icon"/> 
                </button>
            </div>
        </div>
    )
}

export default SettingInput;