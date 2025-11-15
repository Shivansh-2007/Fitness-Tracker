import React, { createContext, useContext, useState} from 'react';
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider( {children} ) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    function login({ user: u, accessToken: token}) {
        setUser(u);
        setAccessToken(token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    function logout() {
        setUser(null);
        setAccessToken(null);
        delete api.defaults.headers.common.Authorization;
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);