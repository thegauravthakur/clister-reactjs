import React, { useContext, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
  Button,
  Link,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import app from "../firebase/base";
import SnackBarBottom from "../components/SnackBarBottom";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/Provider";
import Paper from "@material-ui/core/Paper";
import { ThemeContext } from "../context/ThemeProvider";
import Box from "@material-ui/core/Box";
import { use100vh } from "react-div-100vh";
import Axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://gauravthakur.me/">
        CLister
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignUpPage = ({ history }) => {
  const height = use100vh();
  const data = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const useStyles = makeStyles((theme) => ({
    paper: {
      [theme.breakpoints.down("md")]: {
        minHeight: height - 56,
      },
      [theme.breakpoints.up("sm")]: {
        minHeight: height - 64,
      },

      backgroundColor: data.theme === "dark" ? "black" : "white",
    },
    root: {
      marginTop: theme.spacing(8),
      maxWidth: "400px",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: data.theme === "dark" ? "black" : "white",
      border: data.theme === "dark" ? "1px solid teal" : null,
    },
    icon: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const onSubmitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    let randomFixedInteger = function (length) {
      return Math.floor(
        Math.pow(10, length - 1) +
          Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
      );
    };
    let otp = randomFixedInteger(6);
    let options = {
      method: "POST",
      url: process.env.REACT_APP_API_URL,
      headers: {
        "content-type": process.env.REACT_APP_CONTENT_TYPE,
        "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
      },
      data: {
        personalizations: [
          { to: [{ email: email }], subject: "Verify your email!" },
        ],
        from: { email: "no_reply@clister.tech" },
        content: [{ type: "text/plain", value: `you otp is ${otp}` }],
      },
    };

    Axios.request(options)
      .then(function (response) {
        setLoading(false);
        history.push({
          pathname: "/signup/verify",
          state: { email, password, otp },
        });
        setOpen({
          isOpen: true,
          message: "OTP Sent",
          type: "success",
        });
        console.log("OTP SENT");
      })
      .catch(function (error) {
        setOpen({
          isOpen: true,
          message: error.message,
          type: "error",
        });
        setLoading(false);
        console.error(error);
      });
  };
  const handleClose = () => {
    setOpen({
      isOpen: false,
    });
  };
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const listName = localStorage.listName;
  if (currentUser) {
    if (listName === undefined) return <Redirect to={"/tasks/default"} />;
    else return <Redirect to={`tasks/${listName}`} />;
  }

  return (
    <Paper className={classes.paper}>
      {loading ? <LinearProgress style={{ background: "teal" }} /> : null}
      <SnackBarBottom
        open={open.isOpen}
        type={open.type}
        handleClose={handleClose}
        message={open.message}
      />
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Card className={classes.root}>
          <CardContent className={classes.card}>
            <Avatar className={classes.icon}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" className={classes.title}>
              Create Account
            </Typography>
            <form onSubmit={onSubmitHandler}>
              <TextField
                autoComplete="email"
                type="email"
                required
                autoFocus
                margin="normal"
                fullWidth
                label="Email Address"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                margin="normal"
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                disabled={loading}
                type="submit"
                className={classes.submit}
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <Grid container justify="space-between">
                <Grid item>
                  <Link
                    onClick={() => {
                      history.push("/reset/password");
                    }}
                    href="#"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Paper>
  );
};

export default SignUpPage;
