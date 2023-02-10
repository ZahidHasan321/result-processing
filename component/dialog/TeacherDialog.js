import { Alert, Dialog, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { useState } from 'react';

const roles = [
    {id: 1, rolename: 'Chairman'},
    {id: 2, rolename: 'Tabulator'},
    {id: 1, rolename: 'Member'}
]

const TeacherDialog = (props) => {
    const{open, onClose} = props;
    const [showAlert, setShowAlert] = useState(null);
    const [showError, setShowError] = useState(null);
    function handleClose(){
        onClose();
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget);

        const email = formdata.get('email');
        const password = formdata.get('password');
        const name = formdata.get('name');
        const phone = formdata.get('phone');
        const dept = formdata.get('department');


        await fetch('/api/admin/addTeacher',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({email, password, name, phone, dept})
        })
        .then(res => {
            if(res.ok){
            setShowAlert(true);
            event.target.reset();
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
    <>
        <Dialog   open={open} onClose={handleClose}> 
        <Container component="main" maxWidth='xs'>
                <Box
                sx={{
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
            <DialogTitle sx={{m:'3'}}>Add Teacher</DialogTitle>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, ml:4}}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    />

                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Username"
                    name="name"
                    autoFocus
                    />

                     <TextField
                    margin="normal"
                    fullWidth
                    id="phone"
                    label="phone"
                    name="phone"
                    autoFocus
                    />

                     <TextField
                    margin="normal"
                    fullWidth
                    id="department"
                    label="department"
                    name="department"
                    autoFocus
                    />
                    {/* <BasicSelect list={list} value={member1} onChange={handleChange} label={'Teacher'}/> */}
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                    >
                    Sign In
                    </Button>
                </Box>
                </Box>
                </Container>
                {
                    showAlert && <Alert severity='success'>Teacher Added</Alert>
                }
                {
                    showError && <Alert severity='error'>Email already exists</Alert>
                }
        </Dialog>
        </>
    )
}

export default TeacherDialog;

