import React, {useContext, useEffect, useState} from "react";
import {Drawer} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DataUsageRoundedIcon from '@material-ui/icons/DataUsageRounded';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import app from "../firebase/base";
import {AuthContext} from "../context/Provider";
import CustomListItem from "./CustomListItem";
import {CurrentListTileContext} from "../context/CurrentListTileProvider";
import {LastRouteVisitedContext} from "../context/LastRouteVisited";

const LeftDrawer = ({open, setOpen}) => {
    const [list, setList] = useState([]);
    const currentListTile = useContext(CurrentListTileContext);
    const history = useHistory();
    const [dopen, setDopen] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const currentListEdit = useContext(LastRouteVisitedContext);
    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(false);
    };
    const [message, setMessage] = useState('');
    useEffect(() => {
        let check = true;
        if (currentUser) {
            let temp = [];
            const ref = app.firestore().collection(currentUser.uid).get();
            ref.then((data) => data.docs.forEach((d) => temp.push(d['id']))).then(() => {
                if (check){
                    setList(temp);
                    console.log(list)
                }

            })
        }
        return () => {
            check = false
        }
    }, [currentUser])

    const onDeleteHandler = (documentName) => {
        if (documentName === '') alert('document empty');
        else {
            let temp = [...list];
            let index = temp.indexOf(documentName);
            temp.splice(index, 1);
            setList(temp);
            console.log('document name', documentName);
            console.log('user uid', currentUser.uid);
            if (currentListEdit.route === documentName)
                currentListEdit.toggle('default');
            app.firestore().collection(currentUser.uid).doc(documentName).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
            history.push('/tasks/default')
        }

    }

    return (
        <div>
            <Dialog open={dopen} onClose={() => setDopen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New List</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(e) => setMessage(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter List Name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDopen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        let temp = [...list, message];
                        app.firestore().collection(currentUser.uid).doc(message).set({task: []}, {merge: true}).then()
                        setList(temp);
                        currentListEdit.toggle(message);
                        history.push(`/tasks/${message}`)
                        currentListTile.toggle(message);
                        setOpen(false);
                        setDopen(false);
                    }} color="primary">
                        ADD
                    </Button>
                </DialogActions>
            </Dialog>
            <Drawer open={open} onClose={toggleDrawer}>
                <List style={{width: '250px'}}>
                    <ListItem onClick={() => {
                        setDopen(true);
                    }
                    } button>
                        <ListItemIcon><DataUsageRoundedIcon/></ListItemIcon>
                        <ListItemText primary='Add List'/>
                    </ListItem>
                    <CustomListItem show={true} onDelete={(title) => onDeleteHandler(title)} closeD={setOpen}
                                    key={'xtvsr'}
                                    text={'default'}/>
                    {list.map(data => {
                        return data !== 'default' ?
                            <CustomListItem show={false} onDelete={(title) => onDeleteHandler(title)}
                                            closeD={setOpen} key={data}
                                            text={data}/> : null
                    })}
                </List>
            </Drawer>
        </div>
    )
}

export default LeftDrawer;
