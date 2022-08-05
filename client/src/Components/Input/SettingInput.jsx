import { useRef, useEffect } from "react";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import useInputEdit from "../../Hooks/useInputEdit";
import "./SettingInput.css"

const SettingInput = ({title, icon, name, protect, disabled, onEdit, onCancel, ...inputProps}) => {

    const [showEditIcon, showButtons, toggleEdit] = useInputEdit(protect);
    const inputRef = useRef();

    useEffect(()=> {
        if(!!inputRef.current && !showEditIcon && protect) {
            inputRef.current.focus();
        }
    }, [showEditIcon]);

    const editEvent = () => {
        if(inputProps.value === ''){
            alert('este campo es requerido');
            return;
        } 
        if(!!onEdit) onEdit(name);
        toggleEdit();
    }

    const cancelEvent = () => {
        if(!!onCancel) onCancel(name);
        toggleEdit();
    }

    return (
        <div className="setting-input-content">
            <label htmlFor={name}>{title}</label>
            <div className="setting-input">
                {!!icon ? icon : null }
                <input name={name} id={name} 
                    disabled={showEditIcon || disabled} 
                    {...inputProps}
                    ref={inputRef}
                />
                <button type="button" onClick={toggleEdit} 
                    className={`${showEditIcon ? '' : 'button-hidden'}`}
                >
                    <FaPencilAlt className="input-icon edit-icon"/> 
                </button>
            </div>
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