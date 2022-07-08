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
  ToggleButtonGroup
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
              color: 'inherit',
              textDecoration: 'none',
              fontSize: 28
            }}
          >
            KAHUT
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
            {pagesLeft.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
                href={'/user/' + page.toLowerCase().replace(/\s/g, "")}
                // variant='text'
                color={curPage.toUpperCase() == page.toUpperCase() ? 'secondary' : 'inherit'}
              >
                {page}
              </Button>
            ))}

          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {/* <Button
              variant="variant"
              href={'/user/' + page.toLowerCase().replace(/\s/g, "")}
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'inherit', display: 'block', backgroundColor: 'yellow' }}
            >
              {page}
            </Button> */}
            <Button
              variant="outlined"
              startIcon={<AddIcon color='success' />}
              sx={{ my: 2, color: 'inherit', display: 'inherit' }}
              id='resources-button'
              aria-controls={openCreate ? 'resources-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openCreate ? 'true' : undefined}
              onClick={handleClickCreateBtn}
            >
              Create
            </Button>
            <Menu
              id='resources-menu'
              anchorEl={anchorElCreate}
              open={openCreate}
              onClose={handleCloseCreateBtn}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              MenuListProps={{
                'aria-labelledby': 'resources-button'
              }}>
              <MenuItem component='button' href='/user/create/kahut'>Kahut</MenuItem>
              <MenuItem component='button' href='/user/create/course'>Course</MenuItem>
            </Menu>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                style={{
                  border: 'none',
                  outline: 'none'
                }}
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                size="large"
                color="primary">
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClickAccountSetting}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
};
export default Navbar;
