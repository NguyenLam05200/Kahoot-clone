import { useSelector, useDispatch } from 'react-redux';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Tooltip, TextField, Box, Stack, Grid, Paper, Divider, Typography, Container, Button } from '@mui/material'
import { purple } from '@mui/material/colors';

const RightPin = ({ }) => {
  const colorBg = '#46178F';
  const colorText = purple[0];

  return (
    <Box sx={{
      width: '100%',
      height: '90%',
      bgcolor: colorBg,
      display: 'inline-grid',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    }}>
      <Box component='div' justifyContent='center' alignItems='center'>
        <h1 align='center'> Kahut!</h1>
        <Stack
          marginTop={3}
          borderRadius={3}
          padding={4}
          spacing={2}
          direction='column'
          bgcolor='white'>
          <Tooltip title="Enter a nickname to join the game!" placement="top" sx={{ color: "white", fontSize: 15 }}>
            <TextField
              label='Nickname'
              variant='outlined'
              color="secondary"
              inputProps={{
                style: { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }
              }}
            />
          </Tooltip>
          <Button variant="contained" size='large' color="success" sx={{ textTransform: 'none', fontWeight: 'bold' }}>
            OK, go!
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default RightPin;
