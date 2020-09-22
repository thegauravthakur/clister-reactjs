//external libraries
import React, {useContext, useState} from "react";
import {createMuiTheme, ThemeProvider, Paper} from "@material-ui/core";
import {Route, Switch, Redirect} from "react-router-dom";
//user made libraries
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomAppBar from "./components/CustomAppBar";
import {ThemeContext} from "./context/ThemeProvider";
import LeftDrawer from "./components/LeftDrawer";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PageNotFound from "./pages/PageNotFound";


const App = () => {
    const [open, setOpen] = useState(false);
    const data = useContext(ThemeContext);
    const theme = createMuiTheme({
            palette: {
                type: data.theme,
            },
        }
    )

    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <CustomAppBar setOpen={setOpen}/>
                <LeftDrawer open={open} setOpen={setOpen}/>
                <Switch>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route exact path='/reset/password' component={ResetPasswordPage}/>
                    <ProtectedRoute exact path='/tasks/:listName' component={TasksPage}/>
                    <ProtectedRoute exact path="/">
                        <Redirect to="/tasks/default"/>
                    </ProtectedRoute>
                    <Route component={PageNotFound}/>
                </Switch>
            </Paper>
        </ThemeProvider>
    )
}

export default App;
