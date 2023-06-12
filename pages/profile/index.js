import Layout from "@/component/layout/layout";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { useSession } from "next-auth/react";
import { useState } from "react";

const Profile = () => {
  const { status, data } = useSession();
  const [oldPass, setOldPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [pass, setPass] = useState('');
  const [snackbar, setSnackbar] = useState(null);

  if (status === 'unauthenticated') {
    Router.replace('auth/signin');
  }

  if (status === 'loading') return <CircularProgress />

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (oldPass === '' || confirmPass === '' || pass === '') {
      setSnackbar({ children: 'Cannot be empty', severity: 'error' });
    }
    else if (oldPass !== confirmPass) {
      setSnackbar({ children: 'Password doesnot match', severity: 'error' });
    }
    else if (oldPass === pass) {
      setSnackbar({ children: 'New password cannot be old password', severity: 'error' });
    }
    else if (pass.length < 8) {
      setSnackbar({ children: 'Password needs to be at least 8 digits/characters', severity: 'error' });
    }
    else if (oldPass !== data.user.password) {
      setSnackbar({ children: 'Old password does not match', severity: 'error' });
    }
    else {
      await fetch('/api/profile/setPassword', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ id: data.user.id, password: pass })
      })
        .then(res => res.json())
        .then(data => setSnackbar({ children: data.message, severity: data.status }))

    }

  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>Name: {data.user.name}</Typography>
      <Typography>Email: {data.user.email}</Typography>
      <Typography>Phone: {data.user.phone}</Typography>
      <Typography>Department: {data.user.department}</Typography>
      <Typography>Change Password: </Typography>
      <Box component={'form'} onSubmit={handleOnSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '250px', mt: '10px' }}>
        <TextField
          sx={{ mb: '20px' }}
          id="oldpass"
          fullWidth
          label="Old Password"
          variant="outlined"
          value={oldPass}
          onChange={e => setOldPass(e.target.value)}

        />

        <TextField
          sx={{ mb: '20px' }}
          id="confirmoldpass"
          fullWidth
          label="Confirm Password"
          variant="outlined"
          value={confirmPass}
          onChange={e => setConfirmPass(e.target.value)}

        />
        <TextField
          sx={{ mb: '20px' }}
          id="newpass"
          fullWidth
          label="New Password"
          variant="outlined"
          value={pass}
          onChange={e => setPass(e.target.value)}
          helperText='Needs to be 8 digits/letters'
        />
        <Button type="submit" variant="contained" sx={{ width: '100px', alignSelf: 'center' }}>Submit</Button>
      </Box>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => setSnackbar(null)}
          autoHideDuration={3000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </Box>
  )
}

Profile.getLayout = function getLayout({children}) {
  return (
    <Layout>
      <main>{children}</main>
    </Layout>
  )
}
export default Profile;