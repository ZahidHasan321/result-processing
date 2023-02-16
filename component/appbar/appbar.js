import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { Tab, Tabs } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


function MenuAppBar(props) {
  var {pages, query} = props;
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [value, setValue] = useState(pages && pages.findIndex(object => {
    return object.routepath === router.pathname
  }));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };

  if(pages == undefined)
  pages = [];

  useEffect(() => {
    setValue(pages && pages.findIndex(object => {
      return object.routepath === router.pathname
    }))
  },[router.pathname])
  
  return (
    <AppBar position="static">
        <Toolbar disableGutters variant='dense'>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            </Menu>
          </Box>
          
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent:'center' }}>
          <Tabs 
          value={value || 0}
          aria-label="Navigation Tabs"
          indicatorColor="secondary"
          textColor="inherit"
          >
          {pages.map((page, index) => (
            <Tab 
            label={page.routename}
            component={Link}
            key={index}
            onClick={() => {setValue(index)}}
            href={{pathname: page.routepath, query}}
            />
            ))}
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0, mr:1 }}>
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
              <Link href='/' style={{textDecoration:'none', color:'black'}}><MenuItem>Profile</MenuItem></Link>
              <Link href='/admin/' style={{textDecoration:'none', color:'black'}}><MenuItem>Admin Panel</MenuItem></Link>
              <MenuItem onClick={() => {signOut({callbackUrl:'/auth/signin'})}}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      
    </AppBar>
  );
}
export default MenuAppBar;