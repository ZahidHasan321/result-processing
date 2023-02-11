import { Box, Button, Dialog, DialogTitle } from "@mui/material";

const ConfirmDialog = (props) => {
    const {open, onClose, onConfirm} = props;
    

    const handleClose =() => {
        onClose();
    }

    const handleContinue= async() => {
        onConfirm();
        onClose();
    }
    return(
        <Dialog open={open} onClose={handleClose}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <Box sx={{display:'flex', justifyContent:'space-around'}}>
                <Button onClick={() => {onClose()}}>Cancel</Button>
                <Button onClick={handleContinue}>Continue</Button>
            </Box>
            </Box>
            
        </Dialog>
    )
}

export default ConfirmDialog;