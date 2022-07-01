import { useSelector, useDispatch } from 'react-redux';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Tooltip, TextField, Box, Stack, Backdrop, CircularProgress, Divider, Typography, Container, Button } from '@mui/material'
import { purple } from '@mui/material/colors';
import { Form } from 'formik';
import { playerSelector, sendPin } from './playerSlice';
import Socket from '../../utils/socket';
const Idle = ({ }) => {
  const [pin, setPin] = useState(null);
  const dispatch = useDispatch();
  const { isFetching } = useSelector(
    playerSelector
  );

  const colorBg = '#46178F';
  const colorText = purple[0];

  const handleEnterPin = (e) => {
    e.preventDefault();
    if (pin) {
      dispatch(sendPin(pin));
    }
  }

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
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFetching}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Stack
          component='form'
          onSubmit={handleEnterPin}
          borderRadius={3}
          padding={4}
          spacing={2}
          direction='column'
          bgcolor='white'>
          <Tooltip title="Enter the PIN you see on the big screen to the right." placement="top" sx={{ color: "white", fontSize: 15 }}>
            <TextField
              label='Game PIN'
              variant='outlined'
              color="secondary"
              onChange={(e) => setPin(e.target.value)}
              value={pin ? pin : ""}
              inputProps={{
                style: { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }
              }}
            />
          </Tooltip>
          <Button
            // onClick={handleEnterPin}
            type='submit'
            variant="contained"
            color="success">
            Enter
          </Button>
        </Stack>
        {/* <Container maxWidth="xs" display='flex' justifyContent='center' >
          <Box sx={{ bgcolor: 'white', height: '20vh', p: 3 }}  >
              <TextField label='Game pin' variant='outlined' />
              <Button>Enter</Button>
          </Box>
      </Container> */}
      </Box>
    </Box>
  );
};

export default Idle;
