import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await axios.get(`${URL}/api/auth/refetch`, { withCredentials: true });
            setUser(res.data);
            setIsCheckingUser(false);
        } catch (err) {
            console.error("Failed to fetch user:", err);
            setUser(null);
            setIsCheckingUser(false);
        }
    };

    useEffect(() => {
        const loggedStatus = window.localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedStatus);
      }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, isCheckingUser }}>
            {children}
        </UserContext.Provider>
    );
}
