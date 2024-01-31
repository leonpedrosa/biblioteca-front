import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import DashboardAdmin from '../../component/admin/dashboardAdmin';
import axios from 'axios'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import api from '../../axiosConfig'
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeContent, setActiveContent] = React.useState('dashboard');
  const [rentData, setRentData] = React.useState(null)

  const fetchRentApi = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8001/api/rent')
        return (response.data)        
    }
    catch (error) {
        console.log('Erro requisição', error)
        // throw error
        return ("teste")
    }
}

  const handleRentClick = async (arg) => {
    console.log(arg)
    if (arg === 'rent') {
        fetchRentApi();
        return ('123')
    } else {
        console.log('outro argumento')
    }
  }

  const checkDrawerStatus = () => {
    setOpen(!open); 
  }

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', marginTop: `${theme.spacing(8) + 1}px` }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={checkDrawerStatus}>    
            {open ? (
                theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />
            ) : (
                theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>                     
        
        {/* <Divider /> */}
        <List>
        {/* <Stack direction="row" spacing={1} justifyContent="center" width='100%'>
                <Avatar alt="avatar" src="" />
            </Stack>    */}
        <Divider />
          {['Dashboard', 'Alugueis', 'Gerenciar Usuários', 'Logs'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={() => {
                if (text === 'Alugueis') {
                    handleRentClick('rent');
                    return (<h1>234</h1>)
                } else {
                    setActiveContent(text.toLowerCase())
                }
              }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >

                  {index === 0 ? <DashboardIcon /> : 
                   index === 1 ? <AssignmentIcon /> : 
                   index === 2 ? <PermIdentityIcon /> : 
                   index === 3 ? <ManageSearchIcon /> : <MailIcon /> }

                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={async () => {
          const token = localStorage.getItem('token')
          
          const getAuthConfig = (token) => {
            return {
              headers: {
                'Authorization': `Token ${token}`,
              },
            };
          };

          if (token) {
            try {
              const response = await api.get('user/logout/', getAuthConfig(token));                            
              localStorage.removeItem('token')
              localStorage.removeItem('auth')
              navigate('/login')
            }
            catch (error) {
              console.log('error logout', error)
              navigate('/login')
            }
          } else {
            console.log('Token não encontrado localstorage')
            navigate('/login')
          }         
        }}
        sx={{
          minHeight: 100,          
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,   
            // order: open ? 'auto' : 'auto',         
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        > 
          <LogoutIcon/> 
        </ListItemIcon>
        <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  </List>
    

        
      </Drawer>
      <Box component="main" sx={{ 'flexGrow': 1, p: 3 }}>
        <DrawerHeader />
        <DashboardAdmin />
        
        {/* <Typography paragraph>
            Texto1
        </Typography>
        <Typography paragraph>
          Texto2 
        </Typography> */}
      </Box>
    </Box>
  );
}