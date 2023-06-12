import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getSession, signIn } from 'next-auth/react';
import Router from 'next/router';
import { useState } from 'react';


function SignIn() {
  const [error, setError] = useState(false);

  async function redirectUser() {
    const session = await getSession()
    if (session.user.role === 'Teacher') {
      Router.push('/');
    }
    else {
      Router.push('/admin')
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);

    const res = await signIn('credentials', {
      email: formdata.get('email'),
      password: formdata.get('password'),
      redirect: false
    });

    console.log(res)

    if (res.ok) {
      redirectUser();
    }
    else {
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card sx={{ mt: 15 }}>
        <Box
          sx={{
            marginTop: 8,
            mb: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, ml: 5, mr: 10 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error ? <label style={{ color: 'red', fontSize: 10 }}>Username or Password is wrong</label> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Card>
    </Container>
  );
}


SignIn.getLayout = function getLayout({children}) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
export default SignIn;


