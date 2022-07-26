import { useState } from 'react';

const useForm = (initialState = {}) => {
    const [ fields, setFields ] = useState(initialState);

    const fieldChange = ({target:{name, value}}) => {
        setFields({
            ...fields,
            [name]: value
        });
    }

    const reseFields = () => setFields(initialState);

    return [fields, fieldChange, reseFields];
}

export default useForm;