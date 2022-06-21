import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { TextField, Box, Stack, Grid, Paper, Divider, Typography, Container, Button } from '@mui/material'
import { purple } from '@mui/material/colors';

import { useSelector } from "react-redux";
import { playerSelector } from './playerSlice';

const Game = ({ }) => {
  const { status, name } = useSelector(
    playerSelector
  );
  const colorBg = '#46178F';
  const colorText = purple[0];

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      bgcolor: colorBg,
      display: 'inline-grid',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    }}>
      {status === 'rightName' &&
        <Box component='div' justifyContent='center' alignItems='center'>
          <Stack spacing={2} >
            <h1 align='center'>Hi {name}, you're in!</h1>
            <h4 align='center'>See your name on screen?</h4>
          </Stack>
        </Box>
      }
      {status === 'startGame' &&
        <Box component='div' justifyContent='center' alignItems='center'>
          <Stack spacing={2} >
            <h1 align='center'>Hi Lam, you're in!</h1>
            <h4 align='center'>See your name on screen?</h4>
          </Stack>
        </Box>
      }

    </Box>
  );
};

export default Game;
