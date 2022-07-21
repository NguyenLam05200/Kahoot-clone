import { Box, Stack, Slide, Typography } from '@mui/material'
import { useEffect, useState } from 'react';

const GetReady = () => {
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  useEffect(() => {
    count === 2 && setChecked2(false);
    count === 3 && setChecked(true);
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 500);
    return () => clearInterval(interval);
  }, [setChecked2, count]);

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Slide direction="down" in={checked2} mountOnEnter unmountOnExit>
        <Stack spacing={7} alignItems="center">
          <Typography
            sx={{
              color: 'white',
              fontSize: 150,
              fontFamily: [
                'Chilanka',
                'cursive',
              ].join(','),
            }}
            align='center' fontWeight='bold'>
            Kahut!
          </Typography>
          <Typography
            sx={{
              color: 'white',
            }}
            variant="h3" align='center' fontWeight='bold'>
            Basic edition!
          </Typography>
        </Stack>
      </Slide>
      <Slide direction="down" in={checked} mountOnEnter>
        <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
          <Typography
            sx={{
              color: 'black',
            }}
            variant="h4" align='center' fontWeight='bold'>
            Challenge your colleagues remotely 🍏🍌🍍😄
          </Typography>
        </Box>
      </Slide>
    </Box>
  );
};

export default GetReady;
