import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import app from "../firebase/base";
import {AuthContext} from "../context/Provider";
import {ThemeContext} from "../context/ThemeProvider";
import Sun from '@material-ui/icons/Brightness7Rounded';
import Moon from '@material-ui/icons/Brightness2Rounded';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    moon: {
        color: 'white'
    }
}));

const CustomAppBar = ({setOpen}) => {
    const {currentUser} = useContext(AuthContext);
    const data = useContext(ThemeContext);
    const classes = useStyles();
    const logoutHandler = () => {
        app.auth().signOut().catch(e => alert(e));
    }
    const createAccountHandler = () => {
        alert('Currently we do not accept new users, if you really want to try out application please drop a mail at gthakur581@gmail.com')
    }
    return (
        <AppBar position="static" color={data.theme === 'dark' ? 'default' : 'primary'}>
            <Toolbar>
                {currentUser ? <IconButton onClick={() => setOpen(true)} edge="start" className={classes.menuButton}
                                           color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton> : null}
                <Typography variant="h6" className={classes.title}>
                    CLister
                </Typography>
                <IconButton onClick={data.toggle}>
                    {data.theme === 'dark' ? <Sun/> : <Moon className={classes.moon}/>}
                </IconButton>
                {currentUser ? <Button onClick={logoutHandler} color="inherit">Logout</Button> :
                    <Button onClick={createAccountHandler} color="inherit">Create Account</Button>}
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;