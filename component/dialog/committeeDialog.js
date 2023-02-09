import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";

const CommitteeDialog = (props) => {
    const{open, onClose} = props;

    function handleClose(){
        onClose();
    }
    return(
        <Dialog open={open} onClose={handleClose}> 
            <DialogTitle>Dialog</DialogTitle>
        </Dialog>
    )
}

export default CommitteeDialog;

