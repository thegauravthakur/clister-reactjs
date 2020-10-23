//external libraries
import React, { useContext, useState } from "react";
import { createMuiTheme, ThemeProvider, Paper } from "@material-ui/core";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Offline } from "react-detect-offline";
//user made libraries
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomAppBar from "./components/CustomAppBar";
import { ThemeContext } from "./context/ThemeProvider";
import LeftDrawer from "./components/LeftDrawer";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import Typography from "@material-ui/core/Typography";
import SignUpPage from "./pages/SignUpPage";
import VerifyUser from "./pages/VerifyUser";

const App = () => {
  const currentTheme = useContext(ThemeContext);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const data = useContext(ThemeContext);
  const theme = createMuiTheme({
    palette: {
      type: data.theme,
      primary: {
        main: currentTheme.theme === "light" ? "#3f50b5" : "#1DA1F2",
      },
    },
  });
  const listName = localStorage.listName;
  return (
    <ThemeProvider theme={theme}>
      <Offline>
        <div style={{ backgroundColor: "red" }}>
          <Typography style={{ color: "white" }} align="center">
            No Internet Connection
          </Typography>
        </div>
      </Offline>

      <Paper>
        {location.pathname !== "/" ? <CustomAppBar setOpen={setOpen} /> : null}
        <LeftDrawer open={open} setOpen={setOpen} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/app">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup/verify" component={VerifyUser} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/reset/password" component={ResetPasswordPage} />
          <ProtectedRoute exact path="/tasks/:listName" component={TasksPage} />
          <ProtectedRoute exact path="/">
            {listName === undefined ? (
              <Redirect to={"/tasks/default"} />
            ) : (
              <Redirect to={`tasks/${listName}`} />
            )}
          </ProtectedRoute>
          <Route component={PageNotFound} />
        </Switch>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
