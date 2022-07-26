

const FormInput = ({title, icon, name, ...inputProps}) => {
    return (
        <div className="input-content">
            <label htmlFor={name}>{title}</label>
            <div className="input">
                { !!icon ? icon : null }
                <input {...inputProps} name={name} id={name}/>
            </div>
        </div>
    );
}

export default FormInput;