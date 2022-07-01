import { Box, Stack, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react';

const GetReady = ({ }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      count > 2 ? setCount(0) : setCount((count) => count + 1);
    }, 500);
    return () => clearInterval(interval);
  });


  const colorBg = '#46178F';

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
      <Box component='div' justifyContent='center' alignItems='center'  >
        <Stack spacing={5} alignItems="center">
          <Typography variant="h3" align='center' fontWeight='500' fontFamily='Segoe UI'>Get Ready!</Typography>
          <CircularProgress
            thickness={10}
            size="5rem"
            color="inherit"
          // style={{ padding: "5px" }}
          />
          <Typography variant="h5" align='center' fontWeight='bold'>
            Loading
            {count === 0 && ' .'}
            {count === 1 && ' ..'}
            {count === 2 && ' ...'}
          </Typography>
        </Stack>
      </Box>
    </Box >
  );
};

export default GetReady;
