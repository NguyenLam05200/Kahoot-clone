import * as React from 'react';

import {
  Box,
  Typography,
  IconButton,
  Fab,
  TextField,
  Stack,
  Link,
  Button,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';

import { Navigate, useOutlet, useNavigate } from "react-router-dom";
import { parseJwt } from '../utils/axios';


const options = [
  'Vietnamese',
  'English',
  'Chinese',
  'France',
  'Japanese',
];

export const AuthLayout = () => {


  const outlet = useOutlet();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const token = localStorage.kahut_app_accessToken

  if (token) {
    const tokenParse = parseJwt(token);
    if (tokenParse.exp * 1000 < Date.now()) {
      delete localStorage.kahut_app_accessToken;
    } else {
      return <Navigate to="/user/home" replace />;
    }
  }

  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '55px',
          backgroundColor: 'white',
          display: 'flex',
          px: 2,
          boxShadow: 10,
        }}
      >
        <Box sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Typography
            onClick={() => navigate('/')}
            sx={{
              color: 'purple',
              fontSize: 30,
              fontWeight: 'bold',
              fontFamily: [
                'Chilanka',
                'cursive',
              ].join(','),
              cursor: 'pointer'
            }}>
            Kahut!
          </Typography>
        </Box>
        <Box sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <Fab
            onClick={handleClickListItem}
            aria-expanded={open ? 'true' : undefined}
            variant="extended"
            style={{
              border: "none",
              outline: "none"
            }}
            size="small"
            sx={{
              textTransform: 'none',
              color: 'black',
              backgroundColor: 'white'
            }}>
            <LanguageIcon fontSize="medium" sx={{ mr: 1, color: 'black' }} />
            {options[selectedIndex]}
          </Fab>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <Box
        sx={{
          py: 5,
          width: '100%',
          minHeight: 'calc(100vh - 55px)',
          backgroundColor: '#f2f2f2',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
        }}
      >
        {outlet}
      </Box>
    </Box >
  );
};
