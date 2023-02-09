import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Dialog, DialogTitle } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const TeacherDialog = (props) => {
    const{open, onClose} = props;

    function handleClose(){
        onClose();
    }

    const handleSubmit = () => {

    }
    return(
    <>
        <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose}> 
        
                <Box
                sx={{
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'baseline',
                }}
                >
            <DialogTitle sx={{m:'auto'}}>Add Teacher</DialogTitle>
            
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, ml:2 }}>
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
                
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                </Box>
                </Box>
            
        </Dialog>
        </>
    )
}

export default TeacherDialog;

