import React, {useContext, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import Title from "../components/Title";
import ListView from "../components/ListView";
import {makeStyles} from "@material-ui/core/styles";
import {ThemeContext} from "../context/ThemeProvider";
import {useParams, useHistory} from "react-router-dom";
import {CurrentListTileContext} from "../context/CurrentListTileProvider";
import { use100vh } from 'react-div-100vh'
const TasksPage = () => {
    const height = use100vh();
    const {listName} = useParams();
    const history = useHistory();
    const data = useContext(ThemeContext);
    const currentListTile = useContext(CurrentListTileContext);
    const useStyle = makeStyles((theme) => ({
        paper: {
            [theme.breakpoints.down('md')]: {
                minHeight: height - 56,
            },
            [theme.breakpoints.up('sm')]: {
                minHeight: height - 64,
            },
            backgroundColor: data.theme === 'dark' ? 'Black' : 'white',
        }
    }))
    const classes = useStyle();

    useEffect(()=> {
        currentListTile.toggle(listName);
    })

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