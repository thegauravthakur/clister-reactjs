import React from "react";
import {Grid, Paper} from "@material-ui/core";
import Title from "../components/Title";
import ListView from "../components/ListView";

const HomePage = () => {

    return (
        <Paper style={{minHeight: '100vh'}}>
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