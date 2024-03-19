import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from 'react-responsive';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FeedIcon from '@mui/icons-material/Feed';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { userReducer } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import isLoggedIn from '../api.js/isLoggedIn';
import searchUser from '../api.js/searchUser';




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

export default function Sidebar(props) {
    const navigate = useNavigate()
    React.useEffect(() => {
        dispatch(userReducer())
    }, [])

    const user = useSelector((state) => state.userReducer.user)
    const socket = useSelector(state => state.socket.socket);
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);

    React.useEffect(() => {
        search && searchUser(search).then(data => { setSearchResults(data); console.log(data, "search results") })
    }, [search])

    React.useEffect(() => {
        socket.emit('online', { userId: user.userId })
        return () => socket.emit('offline', { userId: user.userId })
    }, [])

    const logout = () => {
        localStorage.clear()
        socket.emit('offline', { userId: user.userId })
        navigate('/login')
    }


    React.useEffect(() => {


        let token = JSON.parse(localStorage.getItem('userKey'));
        !token ? navigate('/login') : isLoggedIn().then(data => {
            !data.loggedIn && navigate('/login')
        }).catch(err => navigate('/login'))

    }, [])

    const isMob = useMediaQuery({
        query: '(max-width: 450px)'
    })

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(userReducer())
    }, [])

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClick = (label) => {
        switch (label) {
            case 'Feed':
                navigate('/')
                break;
            case 'Community':
                navigate('/community')
                break;
            case 'Chat':
                navigate('/chat')
                break;
            case 'Notification':
                navigate('/notification')
                break;
            case 'Profile':
                navigate('/profile')
                break;
            case 'Settings':
                navigate('/settings')
                break;
            case 'Logout':
                logout()

                break;
            default:
                console.log('switch default')

        }


    };

    let sidebar = [{ label: 'Feed', icon: <FeedIcon /> },
    { label: 'Community', icon: <Diversity1Icon /> },
    { label: 'Chat', icon: <ChatIcon /> },
    { label: 'Notification', icon: <NotificationsActiveIcon /> },
    { label: 'Profile', icon: <AccountCircleIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> },
    { label: 'Logout', icon: <LogoutIcon /> }]

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#f0f2f5', minHeight: '100vh', minWidth: '100vw' }}>
            <CssBaseline />

            <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }} >
                <Toolbar>
                    {!isMob && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <div className='flex flex-row-reverse justify-between w-full'>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`bg-gray-200 p-2 ${isMob ? 'w-1/2' : 'w-1/3 '} rounded-full focus-visible:outline-none`}
                            placeholder='Search...' />
                        {search && <div className={`${isMob ? 'w-1/2' : 'w-1/3 '} absolute h-56 mt-12  bg-white shadow flex flex-col gap-1 px-5 overflow-y-scroll scrollbar-hide`}>
                            {searchResults?.map(curr => <div className='p-2 flex'
                                onClick={() => { navigate(`/profiles/${curr._id}`); setSearch('') }}><img className='w-[30px] h-[30px] rounded-full' src={curr.picture} alt='failed to load' /><p className='ml-4'>{curr.first_name}</p></div>)}
                        </div>}

                        <Typography variant="h6" noWrap component="div">
                            {open ? '' : 'Tether'}
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>

            {!isMob && <Drawer variant="permanent" open={open} >
                <DrawerHeader sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: '1', textAlign: 'center' }}>
                        Tether
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List >

                    {sidebar.map((content, index) => (
                        <ListItem key={content.label} disablePadding sx={{ display: 'block' }} onClick={(e) => handleClick(content.label)}>
                            <ListItemButton
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
                                    {content.icon}
                                </ListItemIcon>
                                <ListItemText primary={content.label} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                </List>
                <Divider />

            </Drawer>}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div>{props.component ? props.component : <p>Empty page</p>}</div>
            </Box>

            {isMob && <div className='bg-gray-200 w-[100%] h-14 flex justify-around fixed bottom-0'>
                {sidebar.map((content, index) => (
                    <div className='text-gray-600 place-self-center' onClick={(e) => handleClick(content.label)}>
                        {content.icon}
                    </div>
                ))}
            </div>
            }
        </Box>
    );
}
