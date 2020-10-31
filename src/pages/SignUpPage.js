import React, { useContext, useRef, useState } from "react";
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
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [secure, setSecure] = useState(false);
  const captchaRef = useRef();
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
    const templateParams = {
      otp,
      to_email: email,
    };
    emailjs
      .send(
        "default_service",
        process.env.REACT_APP_TEMP_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (response) => {
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
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          setOpen({
            isOpen: true,
            message: err.message,
            type: "error",
          });
          setLoading(false);
          console.error(err);
          console.log("FAILED...", err);
        }
      );
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{}}>
                  <ReCAPTCHA
                    ref={captchaRef}
                    theme={data.theme}
                    sitekey={process.env.REACT_APP_SITE_KEY}
                    onChange={(e) => setSecure(!secure)}
                  />
                </div>
              </div>

              <Button
                disabled={loading || !secure}
                type="submit"
                className={classes.submit}
                fullWidth
                variant="contained"
                color="primary"
              >
                {!secure ? "Click on the captcha" : "Sign In"}
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
