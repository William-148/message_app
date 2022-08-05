import { useState, useCallback } from 'react';

const useInputEdit = (initialState = false) => {
    const [ showEdit, setShowEdit ] = useState(initialState);
    const [ showButtons, setShowButtons ] = useState(false);

    const toggleEdit = useCallback(() => {
        setShowEdit(showEdit => !showEdit);
        setShowButtons(showEdit => !showEdit);
    }, []);

    return [showEdit, showButtons, toggleEdit];
}

export default useInputEdit;
