import React, { useContext } from 'react';
import { ErrorsContext } from '../context';

const useErrors = () => {
    const context = useContext(ErrorsContext)
    console.log(context)
    return context
};

export default useErrors;