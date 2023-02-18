import { Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

const ExaminerDialog = (props) => {
    const {open, onClose} = props;

    const [examinerA, setExaminerA] = useState('')
    const [examinerB, setExaminerB] = useState('')

    const handleOnClose = () => {
        onClose();
    }
    return (
        <Dialog open={open} onClose={handleOnClose}>
            <DialogTitle>Add examiner</DialogTitle>
            <Box component='form'>
                <TextField /> 
            </Box>
        </Dialog>
    )
}

export default ExaminerDialog;