import React from "react";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const SnackBarBottom = ({open, type, message, handleClose}) => {
    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackBarBottom;
