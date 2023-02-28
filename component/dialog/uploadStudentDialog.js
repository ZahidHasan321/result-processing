import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Snackbar from "@mui/material/Snackbar"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { useEffect, useState } from "react"
import SemesterSelector from "../selector/semesterSelector"

const UploadStudentDialog = (props) => {
    const { open, onClose, list, filename } = props;
    const [session, setSession] = useState('');
    const [semester, setSemester] = useState('');
    const [semesterList, setSemesterList] = useState([]);
    const [snackbar, setSnackbar] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        if(session == '' || semester == ''){
            setSnackbar({children:'Session and semester cannot be empty', severity:"error"});
            return;
        }

        if(isNaN(session)){
            setSnackbar({children:'Session needs to be number', severity:"error"});
            return;
        }
        fetch('/api/admin/student/uploadStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ list, session, semester })
        })
            .then(res => {
                if (res.ok) {
                    setSnackbar({children:'Upload to database', severity:"success"})
                    onClose();
                }
                else {
                    setSnackbar({children:'Failed to upload', severity:"error"})
                }
            })
    }

    const getSemesterList = async () => {
        await fetch('/api/admin/courses/semesterList')
            .then(res => res.json())
            .then(data => {
                setSemesterList(data)
            })
    }
    useEffect(() => {
        getSemesterList();
    }, [])

    return (
        <Dialog fullWidth maxWidth='sm' open={open} onClose={() => { onClose() }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <DialogTitle>Upload Students</DialogTitle>
                <Box component='form' onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex' }}>
                        <TextField
                            margin="normal"
                            label='Session'
                            value={session}
                            onChange={e => { setSession(e.target.value) }}
                        />
                        <SemesterSelector sx={{ width: '180px', ml: 5, mt: 2 }} list={semesterList} value={semester} onChange={(value) => setSemester(value)} label='semester' />

                    </Box>
                    <Typography sx={{ mt: 3 }} fontWeight={'bold'}>File Name:</Typography>
                    <Typography>{filename}</Typography>

                    <Box sx={{ display: 'table', m: '0 auto' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            UPLOAD
                        </Button>
                    </Box>
                </Box>
            </Box>

            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={() => { setSnackbar(null) }}
                    autoHideDuration={5000}
                >
                    <Alert {...snackbar} onClose={(() => { setSnackbar(null) })} />
                </Snackbar>
            )}
        </Dialog>
    )
}

export default UploadStudentDialog;