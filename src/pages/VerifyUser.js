import React, {useContext, useEffect, useState} from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
  Button,
  Link,
  LinearProgress
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import app from '../firebase/base';
import SnackBarBottom from '../components/SnackBarBottom';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../context/Provider';
import Paper from '@material-ui/core/Paper';
import {ThemeContext} from '../context/ThemeProvider';
import Box from '@material-ui/core/Box';
import {use100vh} from 'react-div-100vh';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://gauravthakur.me/">
        CLister
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const VerifyUser = ({history, location}) => {
  const {email, password, otp} = location.state;
  const height = use100vh();
  const data = useContext(ThemeContext);
  const [userOTP, setUserOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const [open, setOpen] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  useEffect(() => {
    setOpen({
      isOpen: true,
      message: `OTP sent to ${email}`,
      type: 'success'
    });
  }, [])

  const useStyles = makeStyles((theme) => ({
    paper: {
      [theme.breakpoints.down('md')]: {
        minHeight: height - 56
      },
      [theme.breakpoints.up('sm')]: {
        minHeight: height - 64
      },

      backgroundColor: data.theme === 'dark' ? 'black' : 'white'
    },
    root: {
      marginTop: theme.spacing(8),
      maxWidth: '400px'
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: data.theme === 'dark' ? 'black' : 'white',
      border: data.theme === 'dark' ? '1px solid teal' : null
    },
    icon: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
  const onSubmitHandler = event => {
    event.preventDefault();
    setLoading(true);
    if (otp.toString() === userOTP) {
      app.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          app.firestore().collection(currentUser.uid).doc(`default`).set({task: []})
          setLoading(false);
        }).catch(e => {
        setLoading(false);
        setOpen({
          isOpen: true,
          message: e.message,
          type: 'error'
        });
      });
    } else {
      setLoading(false);
      setOpen({
        isOpen: true,
        message: 'Wrong OTP',
        type: 'error'
      });
    }
  };
  const handleClose = () => {
    setOpen({
      isOpen: false
    });
  };
  const classes = useStyles();

  if (currentUser) return <Redirect to="/tasks/default"/>;

  return (
    <Paper className={classes.paper}>
      {loading ? <LinearProgress style={{background: 'teal'}}/> : null}
      <SnackBarBottom open={open.isOpen} type={open.type} handleClose={handleClose} message={open.message}/>
      <Grid container direction="column" justify="flex-start" alignItems="center">
        <Card className={classes.root}>
          <CardContent className={classes.card}>
            <Avatar className={classes.icon}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5' className={classes.title}>Verify Account</Typography>
            <form onSubmit={onSubmitHandler}>
              <TextField value={userOTP}  required autoFocus margin='normal'
                         fullWidth label='Enter OTP'
                         variant='outlined' onChange={(e) => setUserOTP(e.target.value)}/>
              <Button disabled={loading} type='submit' className={classes.submit} fullWidth
                      variant="contained" color="primary">
                Create Account
              </Button>
              <Grid container justify='space-between'>
                <Grid item>
                  <Link onClick={() => history.push('/login')} href="#" variant="body2">
                    {'Have an account already?'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Box mt={8}>
        <Copyright/>
      </Box>
    </Paper>
  );
};

export default VerifyUser;
