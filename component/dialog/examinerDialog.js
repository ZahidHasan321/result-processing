import { Box, Dialog, DialogTitle, Grow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AutoCompleteTeacher from "../selector/autocompleteTeacher";

const ExaminerDialog = (props) => {
    const {open, onClose, semester, session, course} = props;



    const [examinerA, setExaminerA] = useState('')
    const [examinerB, setExaminerB] = useState('')
    const [List, setList ] = useState([]);

    const getList = async () => {
        fetch('/api/admin/teacherList')
          .then(res => res.json())
          .then(data => {
            setList(data);
          });
      }

    useEffect(() => {
        getList();
    },[])

    const handleOnClose = () => {
        onClose();
    }
    return (
        <Dialog  TransitionComponent={Grow} open={open} onClose={handleOnClose}  sx={{ backdropFilter: 'blur(5px)' }}>
            <DialogTitle>Add examiner</DialogTitle>
            <Box component='form'>
                <AutoCompleteTeacher list={List} onChange={(value) => setExaminerA(value)}/>
            </Box>
        </Dialog>
    )
}

export default ExaminerDialog;