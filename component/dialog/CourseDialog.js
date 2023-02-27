import { Alert, Box, Button, Container, Dialog, DialogTitle, Grow, TextField } from "@mui/material";
import { useState } from "react";
import BasicSelect from "../selector/selector";


const typeList = [
    { id: 'Theory', name: 'Theory' },
    { id: 'Lab', name: 'Lab' },
]

const CourseDialog = (props) => {
    const { open, onClose } = props;
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [credit, setCredit] = useState('');
    const [type, setType] = useState('');
    const [semester, setSemester] = useState('');
    const [showAlert, setShowAlert] = useState(null);
    const [showError, setShowError] = useState(null);



    const handleClose = () => {
        onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (code == '' || semester == '' || name == '' || credit == '' || type == '') {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 4000)
            return;
        }

        await fetch('/api/admin/courses/addCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code : code.trim(), name: name.trim(), credit, type, semester })
        }).then(res => {
            if (res.ok) {
                setShowAlert(true);
                setCode('')
                setName('')
                setCredit('')
                setSemester('')
                setType('')
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000)
            }
            else {
                setShowError(true)
                setTimeout(() => {
                    setShowError(false)
                }, 4000)
            }
        });
    }


    return (
        <Dialog TransitionComponent={Grow} open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(5px)' }}>
            <Container component='main' maxWidth='lg'>
                <Box sx={{ display: 'flex', alignItem: 'center', flexDirection: 'column', mt: 'auto' }}>
                    <Box sx={{ alignSelf: 'center' }}>
                        <DialogTitle sx={{ m: '3', fontWeight: 'bold' }}>Add Course</DialogTitle>
                    </Box>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id='course_code'
                            label='Course Code'
                            name='course_code'
                            value={code}
                            onChange={(e) => { e.preventDefault(); setCode(e.target.value) }}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id='course_name'
                            label='Course Name'
                            name='course_name'
                            value={name}
                            onChange={(e) => { e.preventDefault(); setName(e.target.value) }}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            id='course_credit'
                            label='Course Credit'
                            name='course_credit'
                            value={credit}
                            onChange={(e) => { e.preventDefault(); setCredit(e.target.value) }}
                            autoFocus
                            sx={{ mr: 4 }}
                        />

                        <TextField
                            margin="normal"
                            required
                            id='semester'
                            label='semester'
                            name='semester'
                            value={semester}
                            onChange={(e) => { e.preventDefault(); setSemester(e.target.value) }}
                            autoFocus
                            sx={{ mb: 2 }}
                        />

                        <BasicSelect sx={{ width: '200px' }} value={type} list={typeList} onChange={(value) => { setType(value) }} label='Course Type' />
                        <Box sx={{ display: 'table', m: '0 auto' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                SUBMIT
                            </Button>
                        </Box>

                    </Box>
                    <Box width={300} sx={{alignSelf:'center'}}>
                        {
                            showAlert && <Alert severity='success'>Course Added Successfully</Alert>
                        }
                        {
                            showError && <Alert severity='error'>ERROR has occured!!</Alert>
                        }
                    </Box>
                </Box>
            </Container>
        </Dialog>
    )
}
export default CourseDialog;