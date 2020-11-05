import React, {useContext, useEffect, useState} from "react";
import app from "../firebase/base";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ThemeContext} from "./ThemeProvider";
import {useLocation} from "react-router-dom";

export const AuthContext = React.createContext("");
export const AuthProvider = ({children}) => {
    const location = useLocation();
    const currentTheme = useContext(ThemeContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);
    if (pending) {
        return (
            <div
                style={{
                    backgroundColor:
                        currentTheme.theme === "dark"
                            ? "black"
                            : "white",
                    minHeight: "100vh",
                }}
            >
                <LinearProgress color="secondary"/>
            </div>
        );
    }
    return (
        <AuthContext.Provider
            value={{
                currentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
