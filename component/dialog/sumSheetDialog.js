import { Box, Dialog, DialogTitle, Grow } from "@mui/material";

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