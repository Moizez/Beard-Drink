import React, { createContext, useReducer } from 'react';
import { initialState, UserReducer } from '../reducers/UserReducer'

export const Context = createContext({})

const UserContext = ({ children }) => {

    const [state, dispatch] = useReducer(UserReducer, initialState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}

export default UserContext