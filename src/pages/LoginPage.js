import React, {useContext, useState} from "react";
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
import {makeStyles} from "@material-ui/core/styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import app from "../firebase/base";
import SnackBarBottom from "../components/SnackBarBottom";
import {Redirect} from "react-router-dom";
import {AuthContext} from "../context/Provider";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        maxWidth: '400px'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icon: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const LoginPage = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState({
        isOpen: false,
        message: '',
        type: '',
    });
    const onSubmitHandler = event => {
        event.preventDefault();
        setLoading(true);
        app.auth().signInWithEmailAndPassword(email, password).then(() => {
            setLoading(false);
            history.push('/');
        }).catch(e => {
            setLoading(false);
            setOpen({
                isOpen: true,
                message: e.message,
                type: 'error'
            });
        });

    }
    const handleClose = () => {
        setOpen({
            isOpen: false,
        });
    };
    const classes = useStyles();
    const {currentUser} = useContext(AuthContext);
    if (currentUser)  return <Redirect to="/"/>;

    return (
        <div>
            {loading ? <LinearProgress/> : null}
            <SnackBarBottom open={open.isOpen} type={open.type} handleClose={handleClose} message={open.message}/>
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Card className={classes.root}>
                    <CardContent className={classes.card}>
                        <Avatar className={classes.icon}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography variant='h5' className={classes.title}>Login</Typography>
                        <form onSubmit={onSubmitHandler}>
                            <TextField type='email' required autoFocus margin='normal' fullWidth label='Email Address'
                                       variant='outlined' onChange={(e) => setEmail(e.target.value)}/>
                            <TextField required margin='normal' fullWidth label='Password' variant='outlined'
                                       type='password' onChange={(e) => setPassword(e.target.value)}/>
                            <Button disabled={loading} type='submit' className={classes.submit} fullWidth
                                    variant="contained" color="primary">
                                Sign In
                            </Button>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <Link href="#" variant="body2">
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
        </div>
    )
}

export default LoginPage;