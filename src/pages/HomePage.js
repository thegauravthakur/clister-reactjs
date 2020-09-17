import React from "react";
import {Grid} from "@material-ui/core";
import Title from "../components/Title";
import ListView from "../components/ListView";

const HomePage = () => {

    return (
        <div>
            <Grid container>
                <Grid item sm={2}/>
                <Grid item xs={12} sm={8}>
                    <Title/>
                    <ListView />
                </Grid>
                <Grid item sm={2}/>
            </Grid>
        </div>
    )
}

export default HomePage;