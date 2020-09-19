import React, {useContext, useEffect, useState} from "react";
import {Drawer} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DataUsageRoundedIcon from '@material-ui/icons/DataUsageRounded';
import CustomCard from "./CustomCard";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import app from "../firebase/base";
import {AuthContext} from "../context/Provider";
import CustomListItem from "./CustomListItem";

const LeftDrawer = ({open, setOpen}) => {
    const [list, setList] = useState([]);
    const history = useHistory();
    const [dopen, setDopen] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(false);
    };
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (currentUser) {
            const ref = app.firestore().collection(currentUser.uid).get();
            ref.then((data) => setList(data.docs))
        }


    }, [currentUser])
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
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDopen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        let temp = [...list, {id: message}]
                        setList(temp);
                        const ref = app.firestore().collection(currentUser.uid).doc(`${message}`)
                        ref.onSnapshot(docSnapshot => {
                            if (!docSnapshot.exists) {
                                ref.set({task: []})
                            }
                        }, err => {
                            console.log(`Encountered error: ${err}`);
                        });

                        history.push(`/tasks/${message}`)
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

                    {list.map((data, index) =>
                        <CustomListItem closeD={setOpen} key={data['id']} text={data['id']}/>
                    )}
                </List>
            </Drawer>
        </div>
    )
}

export default LeftDrawer;