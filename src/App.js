import React, {useContext, useState} from "react";
import LoginPage from "./pages/LoginPage";
import {Route, Switch, Redirect} from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomAppBar from "./components/CustomAppBar";
import Paper from "@material-ui/core/Paper";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
// import {ThemeContext} from "./context/ThemeContext";
import {ThemeContext} from "./context/ThemeProvider";
import LeftDrawer from "./components/LeftDrawer";


const App = () => {
    const [open, setOpen] = useState(false);
    const data = useContext(ThemeContext);
    const theme = createMuiTheme(
        {
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
                    <ProtectedRoute exact path='/tasks/:listName' component={TasksPage}/>
                    <ProtectedRoute exact path="/">
                        <Redirect to="/tasks/default"/>
                    </ProtectedRoute>
                </Switch>
            </Paper>
        </ThemeProvider>
    )
}

export default App;
