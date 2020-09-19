import React from "react";
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';

const CustomListItem = ({text, closeD}) => {
    const history = useHistory();
    return (
        <div key={text}>
            <Divider variant="fullWidth" component="li"/>

                <ListItem style={{cursor: 'pointer'}} onClick={() => {
                    history.push(`/tasks/${text}`);
                    closeD(false);
                }} key={text}>
                    <ListItemText
                        primary={text}

                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
        </div>
    )
}

export default CustomListItem;