import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
const drawerWidth = 240;

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const linkStyle = {
    textDecoration:"none", 
    color:"black"
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="fixed" sx={{zIndex: (theme) => {theme.zIndex.drawer+1}}}>
        <Toolbar>
          <Link href={'/'}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2}}
          >
           <Typography color={"black"} fontSize="20px" sx={{textDecoration:'none'}}>
            ICON
            </Typography>
          </IconButton>
          </Link>
          <MenuItem/>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Result Processing System
          </Typography>
          
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => signOut({ callbackUrl: 'http://localhost:3000/auth/signin' })}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}