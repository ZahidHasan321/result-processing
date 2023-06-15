import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Link from "next/link";
import * as React from 'react';
import MenuAppBar from '../appbar/appbar';
import { useSession } from 'next-auth/react';
import useDrawerStore from '@/store/store';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const linkStyle = {
  textDecoration: "none",
  color: "black"
}

export default function PersistentDrawerLeft({ children, pages, query, idx }) {
  const theme = useTheme();
  const {drawerState, toggleDrawer, committeeState, toggleCommittee, examinerState, toggleExaminer, teacherState, toggleTeacher} = useDrawerStore()

  const { status, data } = useSession();

  const handleDrawerClose = () => {
    toggleDrawer()
  };



  if (status === 'unauthenticated')
    return

  if (status === 'loading')
    return
    
  else {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuAppBar idx={idx} onAppbarClick={toggleDrawer} pages={pages} query={query} open={drawerState} />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={drawerState}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            <Link style={linkStyle} href='/' >
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
              <Divider />
            </Link>
            <ListItemButton onClick={toggleCommittee}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Exam Committee" />
              {committeeState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={committeeState} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link style={linkStyle} href='/examCommittee' >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <RotateLeftIcon />
                    </ListItemIcon>
                    <ListItemText primary='Pending' />
                  </ListItemButton>
                </Link>

                <Link style={linkStyle} href='/examCommittee/history' >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary='History' />
                  </ListItemButton>
                </Link>
                <Divider />
              </List>
            </Collapse>


            <ListItemButton onClick={toggleExaminer}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Examiner" />
              {examinerState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={examinerState} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link style={linkStyle} href='/examiner' >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <RotateLeftIcon />
                    </ListItemIcon>
                    <ListItemText primary='Pending' />
                  </ListItemButton>
                </Link>

                <Link style={linkStyle} href='/examiner/history' >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary='History' />
                  </ListItemButton>
                </Link>
                <Divider />
              </List>
            </Collapse>


            <ListItemButton onClick={toggleTeacher}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Course Teacher" />
              {teacherState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={teacherState} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link style={linkStyle} href='/courseTeacher' >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <RotateLeftIcon />
                    </ListItemIcon>
                    <ListItemText primary='Pending' />
                  </ListItemButton>
                </Link>
                <Link style={linkStyle} href='/courseTeacher/history' >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary='History' />
                  </ListItemButton>
                </Link>
                <Divider />
              </List>
            </Collapse>

            {/* <ListItemButton onClick={() => setOpenAdmin(!openAdmin)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" />
            {openAdmin ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAdmin} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link style={linkStyle} href='/admin' >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary='Exam Committee' />
                </ListItemButton>
              </Link>

              <Link style={linkStyle} href='/admin/teachers' >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                  <Image
                      src={TeacherIcon}
                      height={25}
                      width={25}
                      alt='teachers'
                      />
                  </ListItemIcon>
                  <ListItemText primary='Teachers' />
                </ListItemButton>
              </Link>

              <Link style={linkStyle} href='/admin/students' >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                      <Image
                      src={StudentIcon}
                      height={25}
                      width={25}
                      alt='Student'
                      />
                    
                  </ListItemIcon>
                  <ListItemText primary='Students' />
                </ListItemButton>
              </Link>

              <Link style={linkStyle} href='/admin/courses' >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                  <Image
                      src={CourseIcon}
                      height={25}
                      width={25}
                      alt='courses'
                      />
                  </ListItemIcon>
                  <ListItemText primary='Courses' />
                </ListItemButton>
              </Link>
          
            </List>
          </Collapse> */}
          </List>
        </Drawer>
        <Main open={drawerState}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
    );
  }
}