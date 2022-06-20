import { useSelector, useDispatch } from 'react-redux';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { TextField, Box, Stack, Grid, Paper, Divider, Typography, Container, Button } from '@mui/material'
import { purple } from '@mui/material/colors';

import Idle from './Idle';
import RightPin from './RightPin';

const Join = ({ }) => {
  const [isRightPin, setIsRightPin] = useState(false)
  const colorBg = '#46178F';
  const colorText = purple[0];

  return (
    <>
      {isRightPin ? <RightPin /> : <Idle />}
      <Box sx={{
        width: '100%',
        height: '10%',
        bgcolor: colorBg,
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'top',
        color: 'white'
      }}>
        <Box
          sx={{
            display: 'inline-flex',
            color: 'white',
            fontWeight: '700',
          }}
        >
          {"Create your own kahut for FREE at kahut.com"}
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '700',
            justifyContent: 'center'
          }}
        >
          {"Terms | Privacy"}
        </Box>
      </Box>
    </>
  );
};

export default Join;
