// AuthContext.js

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem("auth");
        return storedAuth ? JSON.parse(storedAuth) : { state: false, user: null };
    });

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    const updateLoginStatus = (user) => {
        localStorage.setItem('auth', JSON.stringify({ state: true, user }));
        setAuth({ state: true, user });
    };

    const logout = () => {
        const updateState = { state: false, user: null };
        localStorage.setItem('auth', JSON.stringify(updateState));
        setAuth(updateState);
    };

    const updateUserInfo = (updatedUser) => {
        setAuth((prevAuth) => ({
            ...prevAuth,
            user: {
                ...prevAuth.user,
                ...updatedUser,
            },
        }));
    };

    return (
        <AuthContext.Provider value={{ auth, updateLoginStatus, logout, updateUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
}
