import { createContext, useReducer, useEffect, useState } from 'react'
import {GetDetailsMe} from '../service/UserService';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        user:  JSON.parse(localStorage.getItem('user')) || null
    })
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        async function IsValidToken(){
            try{
                if(user?.token){
                    let res = await GetDetailsMe(user?.token);
                    if(res.ok){
                        // console.log("user: ", user);
                        dispatch({ type: 'LOGIN', payload: user }) 
                    }
                    else{
                        let err = await res.json();
                        throw err[0].message
                    }
                }
            }
            catch(err){
                console.log("err from authContext: ", err)
                localStorage.removeItem('user')
            }
        }
        IsValidToken();
    }, [])

    // console.log('AuthContext state:', state)
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
        { children }
        </AuthContext.Provider>
    )
}