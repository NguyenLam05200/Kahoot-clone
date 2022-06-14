import * as React from 'react';
import {
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
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { green } from '@mui/material/colors';

const pagesLeft = ['Home', 'Discover', 'Library', 'Reports', 'Groups', 'Marketplace'];
const pagesRight = ['Profile', 'Notification'];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Navbar = () => {
  const tempURL = window.location.href.split('/');
  const curPage = tempURL[tempURL.indexOf('user') + 1];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
            {pagesRight.map((page) => (
              page == 'Sign up' ?
                <Button
                  variant="variant"
                  href={'/user/' + page.toLowerCase().replace(/\s/g, "")}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'inherit', display: 'block', backgroundColor: 'yellow' }}
                >
                  {page}
                </Button> :
                <Button
                  key={page}
                  href={'/user/' + page.toLowerCase().replace(/\s/g, "")}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'inherit', display: 'block' }}
                >
                  {page}
                </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
};
export default Navbar;
