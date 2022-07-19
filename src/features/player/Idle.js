import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import { Tooltip, TextField, Box, Stack, Backdrop, CircularProgress, Alert, Button, Typography } from '@mui/material'
import { playerSelector, sendPin, clearState } from './playerSlice';

const Idle = () => {
  const [pin, setPin] = useState(null);
  const dispatch = useDispatch();
  const { isFetching, isError, errorMessage } = useSelector(
    playerSelector
  );

  const colorBg = '#46178F';

  const handleEnterPin = (e) => {
    e.preventDefault();
    if (pin) {
      dispatch(sendPin(pin));
    }
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearState())
    }, 6000);
  }, [isError, dispatch])

  const txtQuery_KeyUp = (event) => {
    if (event.keyCode === 13) {
      if (pin) {
        dispatch(sendPin(pin));
      }
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
        <Typography
          sx={{
            color: 'white',
            fontFamily: [
              'Chilanka',
              'cursive',
            ].join(','),
            my: 3,
          }}
          variant="h2" align='center' fontWeight='bold'>
          Kahut!
        </Typography>
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
              onKeyUp={txtQuery_KeyUp}
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
          {isError &&
            <Alert variant="filled" severity="error">
              {errorMessage} , <strong> check it out!</strong>
            </Alert>
          }
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
