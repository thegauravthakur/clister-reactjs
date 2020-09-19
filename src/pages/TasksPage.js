import React, {useContext, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import Title from "../components/Title";
import ListView from "../components/ListView";
import {makeStyles} from "@material-ui/core/styles";
import {ThemeContext} from "../context/ThemeProvider";
import {useParams, useHistory} from "react-router-dom";

const TasksPage = () => {
    const {listName} = useParams();
    const history = useHistory();
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
                    <Title listName={listName}/>
                    <ListView listName={listName}/>
                </Grid>
                <Grid item sm={2}/>
            </Grid>
        </Paper>
    )
}

export default TasksPage;