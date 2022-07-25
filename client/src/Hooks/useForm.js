import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [ fields, setFields ] = useState(initialState);

    const fieldChange = ({target:{name, value}}) => {
        setFields({
            ...fields,
            [name]: value
        });
    }

    return [ fields, fieldChange ];
}