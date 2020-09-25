import React, {useContext} from "react";
import {Paper, Grid, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {ThemeContext} from "../context/ThemeProvider";
import IconButton from "@material-ui/core/IconButton";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const CustomCard = ({onDeleteHandler, body, index, pprops}) => {
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
        <Paper key={body} {...pprops} className={classes.root} elevation={3}>
            <Grid
                container direction="row">
                <Grid alignItems='center' justify='center' container xs={1} sm={1} item>
                    <Grid item>
                        <IconButton color='primary' data-movable-handle size='small'>
                            <DragIndicatorIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid xs={10} sm={10} item>
                    <Typography className={classes.message}>
                        {body}
                    </Typography>
                </Grid>
                <Grid alignItems='center' container justify='center' xs={1} sm={1} item>
                    <Grid item>
                        <IconButton color='primary' size='small'
                                    onClick={() => onDeleteHandler(index)}><Delete/></IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CustomCard;
