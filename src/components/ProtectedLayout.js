import { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';

import {
  Paper,
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
} from "@mui/material";
import { Navigate, useOutlet } from "react-router-dom";
import { parseJwt } from '../utils/axios';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AddIcon from '@mui/icons-material/Add';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


import {
  logout,
} from '../features/roomKahut/roomSlice';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { refreshToken } from '../features/user/userSlice';
const pagesLeft = ['Home', 'Discover', 'Library', 'Reports'];


export const ProtectedLayout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tempURL = window.location.href.split('/');
  const curPage = tempURL[tempURL.indexOf('user') + 1];

  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);

  // refresh token
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshToken())
    }, 300000);
    return () => clearInterval(interval);
  }, [dispatch])

  // hook for Create menu
  const [anchorElCreate, setAnchorElCreate] = useState(null);
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
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = (event, value) => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickAccountSetting = (event, newValue) => {
  }


  const navigate = useNavigate();
  const handleClickLogout = () => {
    delete localStorage.kahut_app_accessToken;
    dispatch(logout())
    navigate('/login');
  }
  const outlet = useOutlet();

  const token = localStorage.kahut_app_accessToken
  if (token) {
    const tokenParse = parseJwt(token);
    if (tokenParse.exp * 1000 < Date.now()) {
      delete localStorage.kahut_app_accessToken;
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
  return (
    <Paper sx={{ width: '100%', height: '100%' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', height: 70 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ViewInArIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize="large" />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/user/home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: 28,
                '&:hover': {
                  color: 'purple',
                  textDecoration: 'none',
                }
              }}
            >
              KAHUT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                style={{
                  border: 'none',
                  outline: 'none'
                }}
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
                  <MenuItem
                    component={Link}
                    to={'/user/' + page.toLowerCase().replace(/\s/g, "")}
                    key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{t(page)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/dashboard"
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
              Kahut
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pagesLeft.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block' }}
                  component={Link}
                  to={'/user/' + page.toLowerCase().replace(/\s/g, "")}
                  // variant='text'
                  color={curPage.toUpperCase() === page.toUpperCase() ? 'secondary' : 'inherit'}
                >
                  {t(page)}
                </Button>
              ))}

            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                style={{ outline: 'none' }}
                variant="outlined"
                startIcon={<AddIcon color='success' />}
                sx={{ my: 2, color: 'inherit', display: 'inherit' }}
                id='resources-button'
                aria-controls={openCreate ? 'resources-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openCreate ? 'true' : undefined}
                onClick={handleClickCreateBtn}
              >
                {t("Create")}
              </Button>
              <Menu
                onClick={handleCloseCreateBtn}
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
                <MenuItem component={Link} to='/user/create/kahut'>Kahut</MenuItem>
                <MenuItem component={Link} to='/user/create/course'>Course</MenuItem>
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
                  <Avatar /> {t("Profile")}
                </MenuItem>
                <MenuItem>
                  <Avatar /> {t("My kahut")}
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  {t("Settings")}
                </MenuItem>
                <MenuItem
                  onClick={handleClickLogout}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  {t("Logout")}
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar >
      {outlet}
    </Paper>
  );
};
