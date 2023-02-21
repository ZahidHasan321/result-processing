import { Tab, Tabs } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IconImage from '../../public/icon2.png';



function MenuAppBar(props) {
  var { pages, query } = props;
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [value, setValue] = useState(0);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };

  if (pages == undefined)
    pages = [];

  useEffect(() => {
    const idx = (pages && pages.findIndex(object => {
      return object.routepath === router.pathname
    }))
    setValue(idx == -1 ? 0 : idx);
  }, [router.pathname])

  
  return (
    <AppBar position="static" sx={{ bgcolor: 'inherit' }}>
      <Toolbar disableGutters variant='dense'>
        <Link href='/' style={{marginLeft:5}}>
          <Image
            src={IconImage}
            alt="ICON"
            height={40}
            width={40}
          />
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          <Tabs
            value={value || 0}
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

        <Box sx={{ flexGrow: 0, mr: 1 }}>
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
            <Link href='/' style={{ textDecoration: 'none', color: 'black' }}><MenuItem>Profile</MenuItem></Link>
            <Link href='/admin/' style={{ textDecoration: 'none', color: 'black' }}><MenuItem>Admin Panel</MenuItem></Link>
            <MenuItem onClick={() => { signOut({ callbackUrl: '/auth/signin' }) }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default MenuAppBar;