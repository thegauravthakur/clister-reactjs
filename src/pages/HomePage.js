import React, {useContext} from "react";
import {Grid, Paper} from "@material-ui/core";
import Title from "../components/Title";
import ListView from "../components/ListView";
import {makeStyles} from "@material-ui/core/styles";
import {ThemeContext} from "../context/ThemeProvider";

const HomePage = () => {
    const data = useContext(ThemeContext);
    const useStyle = makeStyles(() => ({
        paper: {
            minHeight: '100vh',
            backgroundColor: data.theme === 'dark' ? 'Black' : 'white',
        }
    }))

    const classes = useStyle();

    return (
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item sm={2}/>
                <Grid item xs={12} sm={8}>
                    <Title/>
                    <ListView/>
                </Grid>
                <Grid item sm={2}/>
            </Grid>
        </Paper>
    )
}

export default HomePage;