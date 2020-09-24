import React, {useContext} from "react";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ThemeContext} from "../context/ThemeProvider";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer',
    },
}));
const HomeAppBar = () => {
    const data = useContext(ThemeContext);
    const classes = useStyles();
    const history = useHistory();
    return (
        <AppBar color={data.theme === 'dark' ? 'default' : 'primary'} position="static">
            <Toolbar>
                <Typography onClick={() => {
                    history.push('/')
                }} variant="h6" className={classes.title}>
                    CLister
                </Typography>
                <Button onClick={() => history.push('/login')} color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default HomeAppBar;
