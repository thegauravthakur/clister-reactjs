import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/Provider";
import CustomCard from "./CustomCard";
import app from "../firebase/base";
import CustomInputField from "./CustomInputField";
import {LastRouteVisitedContext} from "../context/LastRouteVisited";
import {List, arrayMove, arrayRemove} from "react-movable";
import {Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {ThemeContext} from "../context/ThemeProvider";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const ListView = ({listName}) => {
    const {currentUser} = useContext(AuthContext);
    const [list, setList] = useState([]);
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
    const currentEditList = useContext(LastRouteVisitedContext);
    const onFormSubmitHandler = (data) => {
        let temp = [...list, data]
        setList(temp)
        app.firestore().collection(currentUser.uid).doc(`${listName}`).set({task: temp})
        currentEditList.toggle(listName);
    }

    const onDeleteHandler = (index) => {
        let temp = [...list]
        temp.splice(index, 1)
        setList(temp)
        app.firestore().collection(currentUser.uid).doc(`${listName}`).set({task: temp})
    }
    useEffect(() => {
        const ref = app.firestore().collection(currentUser.uid).doc(`${listName}`)
        ref.onSnapshot(docSnapshot => {
            if (docSnapshot.exists) {
                let data = docSnapshot.data()
                setList(data.task)
            }
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }, [listName])

    return (
        <div>
            <CustomInputField onSubmit={onFormSubmitHandler}/>
            <List
                values={list}
                onChange={({oldIndex, newIndex}) => {
                    let lines = [...list];
                    let task = lines[oldIndex];
                    lines.splice(oldIndex, 1);
                    lines.splice(newIndex, 0, task);
                    setList(lines);
                    app.firestore().collection(currentUser.uid).doc(`${listName}`).set({task: lines}).then()

                }}
                renderList={({children, props}) => <div {...props}>{children}</div>}
                renderItem={({index, value, props}) => <Paper {...props} className={classes.root} elevation={3}> <Grid
                    container direction="row">
                    <Grid alignItems='center' justify='center' container xs={1} sm={1} item>
                        <Grid item>
                            <IconButton data-movable-handle size='small'>
                                <DragIndicatorIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid xs={10} sm={10} item>
                        <Typography className={classes.message}>
                            {value}
                        </Typography>
                    </Grid>
                    <Grid alignItems='center' container justify='center' xs={1} sm={1} item>
                        <Grid item>
                            <IconButton size='small'
                                        onClick={() => onDeleteHandler(index)}><Delete/></IconButton>
                        </Grid>
                    </Grid>
                </Grid></Paper>}
            />
        </div>
    )
        ;
}

export default ListView;
