import React, {useEffect} from "react";
import {Button} from "@material-ui/core";
import app from "../firebase/base";
import {useHistory} from "react-router-dom";

const HomePage = () => {
    const histroy = useHistory();
    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            if (user == null) histroy.push('/login')
        })
    })
    return (
        <Button onClick={() => {
           app.auth().signOut().catch((e) => alert(e))
        }}>Sign Out</Button>
    )
}

export default HomePage;