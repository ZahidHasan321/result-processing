import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";


import TextField from '@mui/material/TextField';
import { useState } from 'react';



const TeacherDialog = (props) => {
    const { open, onClose } = props;
    const [showAlert, setShowAlert] = useState(null);
    const [showError, setShowError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    function handleClose() {
        onClose();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget);

        const email = formdata.get('email').trim();
        const password = formdata.get('password').trim();
        const name = formdata.get('name').trim();
        const phone = formdata.get('phone').trim();
        const dept = formdata.get('department').trim();

        if (email && password && name && dept) {
            await fetch('/api/admin/addTeacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name, phone, dept })
            })
                .then(res => {
                    console.log(res);
                    if (res.ok) {
                        setShowAlert(true);
                        event.target.reset();
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
        else {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 4000)
        }
    }

    return (
        <Box>
            <Dialog TransitionComponent={Grow} open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(5px)' }}>
                <Container component="main" maxWidth='lg'>
                    <Box
                        sx={{
                            marginTop: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <DialogTitle sx={{ m: '3', fontWeight: 'bold' }}>Add Teacher</DialogTitle>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type='email'
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => { setShowPassword(!showPassword) }}
                                                onMouseDown={(e) => { e.preventDefault() }}
                                                edge='end'
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}

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

                        <Box width={300} sx={{ alignSelf: 'center' }}>
                            {
                                showAlert && <Alert severity='success'>Teacher Added Successfully</Alert>
                            }
                            {
                                showError && <Alert severity='error'>ERROR has occured!!</Alert>
                            }
                        </Box>
                    </Box>
                </Container>
            </Dialog>
        </Box>
    )
}

export default TeacherDialog;

