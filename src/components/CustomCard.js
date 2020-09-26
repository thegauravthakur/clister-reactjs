import React, {useContext, useState} from "react";
import {Paper, Grid, Typography, Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {ThemeContext} from "../context/ThemeProvider";
import IconButton from "@material-ui/core/IconButton";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import app from "../firebase/base";
import {CurrentListTileContext} from "../context/CurrentListTileProvider";

const CustomCard = ({onDeleteHandler, body, index, pprops, onSubmit, currentUser, listName}) => {
    const [showTextInput, setShowTextInput] = useState(false);
    const [message, setMessage] = useState(body);
    const data = useContext(ThemeContext);
    const currentListEdited = useContext(CurrentListTileContext);
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
    const onKeyPressHandler = event => {
        let code = event.keyCode || event.which
        if (code === 13) {
            onSubmit(message, index);

            setShowTextInput(false);
        }
    }
    const classes = useStyle();
    return (
        <Paper onDoubleClick={() => setShowTextInput(!showTextInput)} key={body} {...pprops} className={classes.root}
               elevation={3}>
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
                    {showTextInput ?

                        <TextField InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton color='primary' onClick={() => {
                                        onSubmit(message, index);
                                        setShowTextInput(false);
                                    }}>
                                        <CheckCircleOutlineIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }} fullWidth onKeyDown={onKeyPressHandler} onChange={(e) => setMessage(e.target.value)}
                                   defaultValue={message} autoFocus
                                   onFocus={(e) => e.target.select()}/>

                        :
                        <Typography className={classes.message}>
                            {body}
                        </Typography>}
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
