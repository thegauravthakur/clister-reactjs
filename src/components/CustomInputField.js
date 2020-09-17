import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    },
    input: {
        flex: 1,
    },
    button: {
        padding: '13px'
    }
}));

export default function CustomizedInputBase({onSubmit}) {
    const [text, setText] = useState('');
    const classes = useStyles();
    const onKeyPressHandler = event => {
        let code = event.keyCode || event.which
        if (code === 13) {
            onSubmit(text);
            setText('');
        }
    }
    return (
        <div className={classes.root}>
            <TextField
                autoFocus
                value={text}
                onKeyPress={onKeyPressHandler}
                onChange={(event => setText(event.target.value))}
                onSubmit={onSubmit}
                variant='outlined'
                className={classes.input}
                label='New Item'
            />
            <Button onClick={() => {
                onSubmit(text);
                setText('');
            }} className={classes.button} size={"large"}
                    variant="contained"
                    color="primary">
                Add
            </Button>
        </div>
    );
}
