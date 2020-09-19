import React, {useContext} from "react";
import {Paper, Grid, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {ThemeContext} from "../context/ThemeProvider";

const CustomCard = ({body, index, onDeleteHandler}) => {
    const data = useContext(ThemeContext);
    const useStyle = makeStyles((theme => ({
        root: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            marginBottom: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1)
            }
        },
        message: {
            color: data.theme === 'dark' ? 'white' : 'teal',
        },
        index: {
            fontWeight: 'bold'
        }

    })))
    const classes = useStyle();
    return (
        <Paper className={classes.root} elevation={3}>
            <Grid container direction="row">
                <Grid alignItems='center' justify='center' container xs={1} sm={1} item>
                    <Grid item>
                        <Typography className={classes.index} color="primary">
                            {index}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid xs={10} sm={10} item>
                    <Typography className={classes.message}>
                        {body}
                    </Typography>
                </Grid>
                <Grid alignItems='center' container justify='center' xs={1} sm={1} item>
                    <Grid item>
                        <Delete onClick={() => onDeleteHandler(index - 1)} color={"primary"}/>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CustomCard;