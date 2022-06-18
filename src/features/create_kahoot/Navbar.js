import * as React from 'react';
import {
  Link,
  Divider,
  ListItemIcon,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AddIcon from '@mui/icons-material/Add';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { green } from '@mui/material/colors';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const pagesLeft = ['Home', 'Discover', 'Library', 'Reports', 'Groups', 'Marketplace'];
const pagesRight = ['Profile', 'Notification'];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Navbar = () => {
  const tempURL = window.location.href.split('/');
  const curPage = tempURL[tempURL.indexOf('user') + 1];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // hook for Create menu
  const [anchorElCreate, setAnchorElCreate] = React.useState(null);
  const openCreate = Boolean(anchorElCreate);
  const handleClickCreateBtn = (event) => {
    setAnchorElCreate(event.currentTarget);
  };
  const handleCloseCreateBtn = () => {
    setAnchorElCreate(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event, value) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickAccountSetting = (event, newValue) => {
    console.log(event.target.id);
    console.log(newValue);
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ViewInArIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize="large" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/user/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'purple',
              textDecoration: 'none',
              fontSize: 28
            }}
          >
            KAHUT!
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
              {pagesLeft.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              color="secondary"
              sx={{ my: 2, display: 'flex-inline', textTransform: 'none' }}
              variant='outlined'
              size='medium'
              endIcon={
                <IconButton size="small" variant='contained' color="primary"><Button size='small' variant='contained'>Setting</Button></IconButton>
              }
            >Enter kahut tit...</Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button
              variant="contained"
              sx={{
                my: 2, mx: 1, color: 'black', display: 'inherit',
                backgroundColor: '#e7d8d8',
                '&:hover': {
                  color: 'white',
                  fontWeight: 'bold',
                  backgroundColor: '#fd6161'
                }
              }}
              href='/user/home'
            >
              Exit
            </Button>
            <Button
              variant="contained"
              sx={{ my: 2, mx: 1, color: 'white', display: 'inherit' }}
            >
              Save
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
};
export default Navbar;
