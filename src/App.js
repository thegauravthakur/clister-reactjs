import React, {useContext, useState} from "react";
import LoginPage from "./pages/LoginPage";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
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
                <LeftDrawer open={open} setOpen={setOpen} />
                <Switch>
                    <ProtectedRoute exact path='/' component={HomePage}/>
                    <Route path='/login' component={LoginPage}/>
                </Switch>
            </Paper>
        </ThemeProvider>
    )
}

export default App;
