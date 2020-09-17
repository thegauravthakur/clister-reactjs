import React from "react";
import LoginPage from "./pages/LoginPage";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomAppBar from "./components/CustomAppBar";

const App = () => {
    return (
        <div>
            <CustomAppBar/>
            <Switch>
                <ProtectedRoute exact path='/' component={HomePage}/>
                <Route path='/login' component={LoginPage}/>
            </Switch>
        </div>
    )
}

export default App;
