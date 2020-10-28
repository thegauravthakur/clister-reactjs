import React, { useContext, useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import Gravatar from "react-gravatar";
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DataUsageRoundedIcon from "@material-ui/icons/DataUsageRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import app from "../firebase/base";
import { AuthContext } from "../context/Provider";
import CustomListItem from "./CustomListItem";
import { CurrentListTileContext } from "../context/CurrentListTileProvider";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const LeftDrawer = ({ open, setOpen }) => {
  const [list, setList] = useState([]);
  const currentListTile = useContext(CurrentListTileContext);
  const history = useHistory();
  const [dopen, setDopen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [showTextField, setShowTextField] = useState(false);
  const [name, setName] = useState("");
  const [profileName, setProfileName] = useState("");
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };
  const [message, setMessage] = useState("");
  useEffect(() => {
    let displayName = null;
    if (currentUser) {
      displayName = currentUser.displayName;
    }
    if (displayName === null) setProfileName("name");
    else setProfileName(displayName);
    let check = true;
    if (currentUser) {
      let temp = [];
      const ref = app.firestore().collection(currentUser.uid).get();
      ref
        .then((data) => data.docs.forEach((d) => temp.push(d["id"])))
        .then(() => {
          if (check) {
            setList(temp);
            console.log(list);
          }
        });
    }
    return () => {
      check = false;
    };
  }, [currentUser]);

  const onDeleteHandler = (documentName) => {
    if (documentName === "") alert("document empty");
    else {
      let temp = [...list];
      let index = temp.indexOf(documentName);
      temp.splice(index, 1);
      setList(temp);
      console.log("document name", documentName);
      console.log("user uid", currentUser.uid);
      app
        .firestore()
        .collection(currentUser.uid)
        .doc(documentName)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
      history.push("/tasks/default");
    }
  };

  return (
    <div>
      <Dialog
        open={dopen}
        onClose={() => setDopen(false)}
        aria-labelledby="form-dialog-title"
      >
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
          <Button
            onClick={() => {
              let temp = [...list, message];
              app
                .firestore()
                .collection(currentUser.uid)
                .doc(message)
                .set({ task: [] }, { merge: true })
                .then();
              setList(temp);
              history.push(`/tasks/${message}`);
              currentListTile.toggle(message);
              setOpen(false);
              setDopen(false);
            }}
            color="primary"
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer open={open} onClose={toggleDrawer}>
        <Gravatar
          style={{
            alignSelf: "center",
            border: "2px solid #1DA1F2",
            borderRadius: "100px",
            marginTop: "30px",
          }}
          email={currentUser ? currentUser.email : ""}
          size={150}
        />
        <Grid
          container
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <Grid item>
            {showTextField ? (
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          app
                            .auth()
                            .currentUser.updateProfile({ displayName: name })
                            .then();
                          setProfileName(name);
                          setShowTextField(false);
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                onChange={(e) => setName(e.target.value)}
                defaultValue={profileName}
                autoFocus
                onFocus={(e) => e.target.select()}
              />
            ) : (
              <Typography>{profileName}</Typography>
            )}
          </Grid>
          <Grid item>
            {showTextField ? null : (
              <IconButton onClick={() => setShowTextField(true)}>
                <CreateIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Divider
          variant={"fullWidth"}
          color={"white"}
          style={{ borderWidth: 10 }}
        />
        <List style={{ width: "250px" }}>
          <ListItem
            onClick={() => {
              setDopen(true);
            }}
            button
          >
            <ListItemIcon>
              <DataUsageRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Add List" />
          </ListItem>
          <CustomListItem
            show={true}
            onDelete={(title) => onDeleteHandler(title)}
            closeD={setOpen}
            key={"xtvsr"}
            text={"default"}
          />
          {list.map((data) => {
            return data !== "default" ? (
              <CustomListItem
                show={false}
                onDelete={(title) => onDeleteHandler(title)}
                closeD={setOpen}
                key={data}
                text={data}
              />
            ) : null;
          })}
        </List>
      </Drawer>
    </div>
  );
};

export default LeftDrawer;
