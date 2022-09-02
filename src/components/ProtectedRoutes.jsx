import React from 'react'
import {Navigate, useLocation} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'

const ProtectedRoutes = ({ children }) => {
    const { user } = useAuthContext();
    const location = useLocation();

    console.log("pro - user: ", user);
    if(user && Object.keys(user).length){
        if (!user.token) {
            return <Navigate to="/login" replace state={{ from: location }} />;
        }
    }
    else{
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
};

export default ProtectedRoutes