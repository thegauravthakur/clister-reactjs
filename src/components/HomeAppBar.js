import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "../context/ThemeProvider";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  btn: {
    "&:hover": {
      borderColor: "teal",
    },
  },
}));
const HomeAppBar = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <AppBar color={"default"} position="static">
      <Toolbar>
        <Typography
          onClick={() => {
            history.push("/");
          }}
          variant="h6"
          className={classes.title}
        >
          CLister
        </Typography>
        <Button onClick={() => history.push("/login")} color="inherit">
          Login
        </Button>
        <Button
          className={classes.btn}
          variant={"outlined"}
          onClick={() => history.push("/signup")}
          color="inherit"
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HomeAppBar;
