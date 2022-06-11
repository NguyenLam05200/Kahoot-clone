import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from './UserSlice';
import { Stack, Snackbar, Alert, Backdrop, CircularProgress, Box, Grid, Container, Avatar, Button, TextField, Link, Typography } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

const Signup = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)


  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      // history.push('/');
    }

    if (isError) {
      // toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up your account
        </Typography>
        {open ? <Alert severity="error">{errorMessage}</Alert> : null}
        <Snackbar
          open={open}
          autoHideDuration={2000}
          message={errorMessage}
          onClose={handleClose}
        // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ my: 5 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email', { required: true })}
          />
          <Stack direction='row' spacing={2} marginY={2}>
            <TextField
              fullWidth
              id="first name"
              label="First name"
              name="firstName"
              autoComplete="first name"
              {...register('firstName', { required: false })}
            />
            <TextField
              fullWidth
              id="last name"
              label="Last name"
              name="lastName"
              autoComplete="last name"
              {...register('lastName', { required: false })}
            />
          </Stack>
          <Stack direction='row' spacing={2} marginY={2}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              {...register('password', { required: true })}
            />
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm password"
              type="confirmPassword"
              id="confirmPassword"
              autoComplete="confirm password"
              {...register('confirmPassword', { required: true })}
            />
          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isFetching}
          // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid container justifyContent='right'>
            <Grid item>
              <Link href="/register" variant="body2" underline="hover">
                {"Already have an account? Log in."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
