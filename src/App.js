import React, {useContext} from "react";
import LoginPage from "./pages/LoginPage";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomAppBar from "./components/CustomAppBar";
import Paper from "@material-ui/core/Paper";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
// import {ThemeContext} from "./context/ThemeContext";
import {ThemeContext} from "./context/ThemeProvider";


const App = () => {
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
                <CustomAppBar/>
                <Switch>
                    <ProtectedRoute exact path='/' component={HomePage}/>
                    <Route path='/login' component={LoginPage}/>
                </Switch>
            </Paper>
        </ThemeProvider>
    )
}

export default App;
