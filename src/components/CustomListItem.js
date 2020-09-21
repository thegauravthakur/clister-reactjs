import React, {useContext} from "react";
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";
import {CurrentListTileContext} from "../context/CurrentListTileProvider";

const CustomListItem = ({text, closeD, onDelete, show}) => {
    const currentListItem = useContext(CurrentListTileContext);

    const useStyles = makeStyles((theme) => ({
        root: {
            color: currentListItem.title === text ? '#2196f3' : null,
        },
        hidden: {
            display: currentListItem.title === text ? 'hidden' : null,
        }
    }))

    const history = useHistory();
    const classes = useStyles();
    const currentListTile = useContext(CurrentListTileContext);
    return (
        <div key={text}>
            <Divider variant="fullWidth" component="li"/>

            <ListItem className={classes.root} style={{cursor: 'pointer'}} onClick={() => {
                history.push(`/tasks/${text}`);
                currentListTile.toggle(text);
                closeD(false);
            }} key={text}>
                <ListItemText
                    primary={text}

                />
                {text !== 'default' ? <ListItemSecondaryAction>
                    <IconButton onClick={() => onDelete(text)} edge="end" aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction> : null}
            </ListItem>
        </div>
    )
}

export default CustomListItem;