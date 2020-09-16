import React from "react";
import {Grid, Card, CardContent, TextField, Typography, Avatar, Button, Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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

const LoginPage = () => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <Card className={classes.root}>
                <CardContent className={classes.card}>
                    <Avatar className={classes.icon}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography variant='h5' className={classes.title}>Login</Typography>
                    <form>
                        <TextField autoFocus margin='normal' fullWidth label='Email Address' variant='outlined'/>
                        <TextField margin='normal' fullWidth label='Password' variant='outlined' type='password'/>
                        <Button className={classes.submit} fullWidth variant="contained" color="primary">
                            Sign In
                        </Button>
                        <Grid container justify='space-between'>
                            <Grid item >
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
    )
}

export default LoginPage;