import React from "react";
import {Drawer} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DataUsageRoundedIcon from '@material-ui/icons/DataUsageRounded';

const LeftDrawer = ({open, setOpen}) => {
    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(false);
    };
    return (
        <Drawer open={open} onClose={toggleDrawer}>
            <List>

                <ListItem button>
                    <ListItemIcon><DataUsageRoundedIcon/></ListItemIcon>
                    <ListItemText primary='Clean Cahce'/>
                </ListItem>

            </List>
        </Drawer>
    )
}

export default LeftDrawer;