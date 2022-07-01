import { Box, Stack } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import { playerSelector, ready } from './playerSlice';
import { useEffect } from 'react';

const RightName = ({ }) => {
  const { name } = useSelector(
    playerSelector
  );
  const colorBg = '#46178F';

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(ready());
  //   }, 1000);
  // }, []);

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
      <Box component='div' justifyContent='center' alignItems='center'>
        <Stack spacing={2} >
          <h1 align='center'>Hi {name}, you're in!</h1>
          <h4 align='center'>See your name on screen?</h4>
        </Stack>
      </Box>
    </Box>
  );
};

export default RightName;
