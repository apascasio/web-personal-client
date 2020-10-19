import React, { useState, useEffect, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import { 
    getAccessTokenApi,
    getRefreshTokenApi, 
    // eslint-disable-next-line
    refreshAccesssToken, logout
 }  from '../api/auth';

export const AuthContext = createContext();
export default function AuthProvider(props) {
    const {children} = props;
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });

    useEffect(() => {
        checUserLogin(setUser);
    },[]);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;

}

function checUserLogin(setUser) {
    const accessToken = getAccessTokenApi();
    if(!accessToken){
        const refreshToken = getRefreshTokenApi();
        if(!refreshToken){
            logout();
            setUser({
                user: null,
                isLoading: false
            });
        } else {
            getRefreshTokenApi(refreshToken);
        }
    } else {
        setUser({
            isLoading: false,
            user: jwtDecode(accessToken)
        });
    }

}

