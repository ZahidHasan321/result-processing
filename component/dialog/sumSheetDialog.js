
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Grow from "@mui/material/Grow"



const SumSheetDialog = (props) => {
    const { open, onClose, semester, session, course } = props;

    const handleOnClose = () => {
        onClose();
    }
    return(
    <Dialog TransitionComponent={Grow} fullWidth open={open} onClose={handleOnClose} sx={{ backdropFilter: 'blur(5px)' }}>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <DialogTitle>Suummation Sheet</DialogTitle>
        </Box>
    </Dialog>
    )
}

export default SumSheetDialog;