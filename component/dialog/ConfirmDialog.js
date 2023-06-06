
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Grow from "@mui/material/Grow"



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
        <Dialog TransitionComponent={Grow} open={open} onClose={handleClose}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', height:'150px'}}>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <Box sx={{display:'flex', justifyContent:'space-around'}}>
                <Button onClick={() => {onClose()}}>Cancel</Button>
                <Button sx={{bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' }}} onClick={handleContinue}>Continue</Button>
            </Box>
            </Box>
            
        </Dialog>
    )
}

export default ConfirmDialog;