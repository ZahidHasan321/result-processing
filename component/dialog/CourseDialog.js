import { Alert, Box, Button, Container, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import BasicSelect from "../selector/selector";


const typeList = [
    {id:'Theory',name:'Theory'},
    {id:'Lab',name:'Lab'},
]

const CourseDialog = (props) => {
    const { open, onClose} = props;
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        await fetch('/api/admin/courses/addCourse',{
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({code, name, credit, type, semester})
        }).then(res => {
            if(res.ok){
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
            else{
                setShowError(true)
                setTimeout(() => {
                    setShowError(false)
                },4000)
            }
        });
    }


    return(
        <Dialog open={open} onClose={handleClose} sx={{backdropFilter:'blur(5px)'}}>
            <Container component='main' maxWidth='xl'>
            <Box sx={{display:'flex',alignItem:'center', flexDirection:'column', mt:'auto'}}> 
            <DialogTitle>Add Course</DialogTitle>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{mt:1}}>

            <TextField 
            margin="normal"
            required
            fullWidth
            id='course_code'
            label='Course Code'
            name='course_code'
            value={code}
            onChange={(e) => {e.preventDefault();setCode(e.target.value)}}
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
            onChange={(e) => {e.preventDefault();setName(e.target.value)}}
            autoFocus
            />

            <TextField 
            margin="normal"
            required
            fullWidth
            id='course_credit'
            label='Course Credit'
            name='course_credit'
            value={credit}
            onChange={(e) => {e.preventDefault();setCredit(e.target.value)}}
            autoFocus
            />

            <TextField 
            margin="normal"
            required
            fullWidth
            id='semester'
            label='semester'
            name='semester'
            value={semester}
            onChange={(e) => {e.preventDefault();setSemester(e.target.value)}}
            autoFocus
            />

            <BasicSelect value={type} list={typeList} onChange={(value) => {setType(value)}} label='Course Type' />
            <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                    >
                    SUBMIT
            </Button>
            </Box>
                {
                    showAlert && <Alert severity='success'>Teacher Added Successfully</Alert>
                }
                {
                    showError && <Alert severity='error'>ERROR!! Email already exists</Alert>
                }
            </Box>
            </Container>
        
        </Dialog>
    )
}
export default CourseDialog;