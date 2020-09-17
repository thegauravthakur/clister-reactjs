import React, {useEffect, useState} from "react";
import app from "../firebase/base";
import LinearProgress from "@material-ui/core/LinearProgress";
export const AuthContext = React.createContext('');
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);
    if (pending) {
        return (
            <LinearProgress color="secondary" />
        )
    }
    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};