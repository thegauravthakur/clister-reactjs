import React from "react";
import LoginPage from "./components/LoginPage";
import {Route, Switch} from "react-router-dom";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

    return (
        <Switch>
            <ProtectedRoute exact path='/' component={HomePage}/>
            <Route path='/login' component={LoginPage}/>
        </Switch>
    )
}

export default App;
