import React, {useContext, useEffect, useState} from "react";
import app from "../firebase/base";
import {AuthContext} from "./Provider";
import {useHistory, useLocation} from "react-router-dom";
import {Paper} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

export const LastRouteVisitedContext = React.createContext('');
export const LastRouteVisitedProvider = ({children}) => {
    const location = useLocation();
    const history = useHistory();
    const [route, setRoute] = useState('default');
    const {currentUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (currentUser) {
            if (location.pathname === '/signup') {
                app.database().ref(currentUser.uid).set({name: 'default'}).then(()=> {
                    app.auth().signOut().then(() => {
                        history.push('/login');
                        alert('account created!')
                    })
                })


            } else {
                setLoading(true)
                app.database().ref(currentUser.uid).on('value', (data) => {
                    setLoading(false)
                    history.push(`/tasks/${data.val()['name']}`);
                    setRoute(data.val()['name'])
                })
            }

        }
    }, [currentUser])

    if (loading) {
        return (
            <Paper style={{minHeight: '100vh', backgroundColor: "black"}}>
                <LinearProgress/>
                <div
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <CircularProgress/>
                </div>
            </Paper>

        )
    }

    const updateRote = (data) => {
        if (currentUser) {
            app.database().ref(currentUser.uid).set({name: data});
        }
    }

    return (
        <LastRouteVisitedContext.Provider
            value={{
                route: route,
                toggle: (data) => updateRote(data)
            }}
        >
            {children}
        </LastRouteVisitedContext.Provider>
    );
};
