
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Grow from "@mui/material/Grow"



const ConfirmDialog = (props) => {
    const {open, onClose, onConfirm, message, label, params} = props;
    

    const handleClose =() => {
        onClose();
    }

    const handleContinue= () => {
        onConfirm(params);
        onClose();
    }
    return(
        <Dialog TransitionComponent={Grow} open={open} onClose={handleClose} sx={{backdropFilter: 'blur(5px)'}}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', height:'150px'}}>
            <DialogTitle fontSize={24} >{message}</DialogTitle>
            <Box sx={{display:'flex', justifyContent:'space-around', mt:2}}>
                <Button size="large" variant="text" onClick={() => {onClose()}}>Cancel</Button>
                <Button size="large"  variant="contained" sx={{color:'white', bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' }}} onClick={handleContinue}>{label}</Button>
            </Box>
            </Box>
            
        </Dialog>
    )
}

export default ConfirmDialog;