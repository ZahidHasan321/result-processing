import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import MenuAppBar from '../appbar/appbar';

const drawerWidth = 180;

function ResponsiveDrawer({pages, query}){

  const drawer = (
    <div>
      <MenuAppBar />
      <List>
        {pages.map((page, index) => (
          <Link href={{pathname:page.routepath, query}} key={index} style={{textDecoration:"none", color:"black"}}>
          <ListItem key={page.routename} disablePadding>
            <ListItemButton>
              <ListItemText primary={page.routename} />
            </ListItemButton>
          </ListItem>
          <Divider/>
          </Link>
        ))}

      </List>
    </div>
  );

  return (
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
  );
}

export default ResponsiveDrawer;