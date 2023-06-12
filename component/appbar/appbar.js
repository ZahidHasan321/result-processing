import MenuIcon from '@mui/icons-material/Menu';
import { Button, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



function MenuAppBar(props) {
  var { pages, query, open, onAppbarClick, idx } = props;
  const router = useRouter();

  const { status, data } = useSession();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [value, setValue] = useState(idx);

  console.log(idx)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };

  if (pages == undefined)
    pages = [];


  if (status === 'unauthenticated')
    return

  if (status === 'loading')
    return

  else {
    return (
      <AppBar position="fixed" open={open} sx={{ bgcolor: 'white' }}>
        <Toolbar disableGutters variant='dense'>
          {
            data.user.role === 'Teacher'
            &&
            <Box sx={{ flexGrow: 0, pl: 2 }}>
              <IconButton
                color="black"
                aria-label="open drawer"
                onClick={() => { onAppbarClick() }}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          }

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Tabs
              value={value}
              aria-label="Navigation Tabs"
              indicatorColor="secondary"
              textColor="secondary"
            >
              {pages.map((page, index) => (
                <Tab
                  sx={{ color: '#2c1630' }}
                  label={page.routename}
                  component={Link}
                  key={index}
                  onClick={() => { setValue(index) }}
                  href={{ pathname: page.routepath, query }}
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0, mr: 1, ml: 'auto' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Avatar" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link href='/profile' style={{ textDecoration: 'none', color: 'black' }}><MenuItem>Profile</MenuItem></Link>
              <MenuItem onClick={() => { signOut({ callbackUrl: '/auth/signin' }) }}>Logout</MenuItem>
            </Menu>
          </Box>
          {
            data &&
            <Link style={{ textDecoration: 'none' }} href='/profile'>{data.user.name.length > 10 ? `${data.user.name.substring(0, 10)}...` : data.user.name}</Link >
          }
        </Toolbar>
      </AppBar>
    );
  }
}
export default MenuAppBar;