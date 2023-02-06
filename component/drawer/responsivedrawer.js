import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import MenuAppBar from '../appbar/appbar';

const drawerWidth = 180;

function ResponsiveDrawer({pages}) {
  const drawer = (
    <div>
      <MenuAppBar />
      <Toolbar/>
      
      <List>
        {pages.map((page, index) => (
          <Link href={page.routepath} key={index} style={{textDecoration:"none", color:"black"}}>
          <ListItem key={page.routename} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={page.routename} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{display:"flex"}}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
          }}

          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;