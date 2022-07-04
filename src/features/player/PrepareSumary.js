import { Box, Stack, Paper, Grid, Typography, Button, CircularProgress } from '@mui/material'

import { useSelector, useDispatch } from "react-redux";
import { playerSelector } from './playerSlice';
import { useState, useEffect } from 'react';
import DangerousIcon from '@mui/icons-material/Dangerous';

const PrepareSumary = ({ }) => {
  const { name, score } = useSelector(
    playerSelector
  );
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      count > 2 ? setCount(0) : setCount((count) => count + 1);
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
    }}>
      <Box
        sx={{
          height: '95%',
          boxShadow: 5,
          display: 'flex',
          backgroundColor: '#1368CE',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Typography
            sx={{
              fontFamily: [
                'cursive',
              ].join(','),
            }}
            variant="h3" align='center' fontWeight='bold'>
            Drum roll
            {count === 0 && ' .  '}
            {count === 1 && ' .. '}
            {count === 2 && ' ...'}
          </Typography>
          <CircularProgress
            thickness={10}
            size="5rem"
            color="inherit"
          // style={{ padding: "5px" }}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          height: '5%',
          boxShadow: 5,
          display: 'flex',
          px: 1,
        }}
      >
        <Typography sx={{
          fontWeight: 'bold',
          width: '40%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'left',
          display: 'flex',
          fontSize: 20,
        }}>
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '60%',
            alignItems: 'center',
            justifyContent: 'right',
          }}
        >
          <Button variant="contained"
            aria-disabled='true'
            sx={{
              mx: 1,
              fontWeight: 'bold',
              backgroundColor: 'black',
              "&:hover": {
                backgroundColor: "black"
              },
              cursor: 'text',
              py: 0.3
            }}
          >{score}</Button>
          <Button
            variant='contained'
            color='success'
            sx={{ textTransform: 'none', py: 0.3 }}
          >Sign up</Button>
        </Box>

      </Box>
    </Box >
  );
};

export default PrepareSumary;
