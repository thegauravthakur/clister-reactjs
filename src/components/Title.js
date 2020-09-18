import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    title: {
        color: 'teal',
        margin: '20px 0 20px 0',
        fontFamily: ['Fredoka One', 'cursive']
    }
}))

const Title = () => {
    const classes = useStyle();
    return (
        <Typography className={classes.title} align='center' variant='h3' color='teal'>
            CLister
        </Typography>
    )
}

export default Title;