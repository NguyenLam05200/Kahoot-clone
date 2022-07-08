import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from './userSlice';
import {
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Box,
  Stack, IconButton, Avatar, Button, Divider, Link, Typography
} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router-dom';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { ReactComponent as Logo } from "../../assets/images/icons/social-google.svg";
import { SvgIcon } from '@mui/material';

const LoginForm = ({ }) => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [helperTextEmail, setHelperTextEmail] = useState('')
  const [helperTextPassword, setHelperTextPassword] = useState('')
  const [open, setOpen] = useState(false)


  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );

  const onSubmit = () => {
    setHelperTextEmail('')
    setHelperTextPassword('')

    if (values.email.trim() === '') {
      setHelperTextEmail('Please fill in email field!')
    }

    if (values.password.trim() === '') {
      setHelperTextPassword('Please fill in password field!')
    }

    if (values.email.trim() !== '' && values.password.trim() !== '') {
      const emailInput = values.email.trim();
      const sliceLowerCase = emailInput.slice(-10).toLocaleLowerCase();
      const dataInput = {
        email: sliceLowerCase === '@gmail.com' ? emailInput.slice(0, -10) + '@gmail.com' : emailInput + '@gmail.com',
        password: values.password.trim(),
      }
      dispatch(loginUser(dataInput));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      setOpen(true)
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate(-1);
    }
  }, [isError, isSuccess]);

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        boxShadow: 5,
        p: 4,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 2,
        minWidth: 300,
        width: 400,
        backgroundColor: 'white'
      }}
    >
      <Stack sx={{ width: '100%' }} spacing={2} alignItems='center'>
        <Typography sx={{
          fontWeight: 'bold',
          fontSize: 35,
          color: 'black',
          fontFamily: [
            'Chilanka',
            'cursive',
          ].join(','),
        }}>Log in</Typography>
        {/* <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar> */}
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
        {/* <FormControl fullWidth>
              <TextField label="Email" variant="outlined" sx={{ mt: 1 }} />
              <FormHelperText>Helper text for email.</FormHelperText>
            </FormControl> */}

        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>

          <OutlinedInput
            required
            id="outlined-adornment-email"
            value={values.email}
            onChange={handleChange('email')}
            endAdornment={<InputAdornment position="end">@gmail.com</InputAdornment>}
            aria-describedby="outlined-email-helper-text"
            label="Email"
          />
          <FormHelperText error>{helperTextEmail}</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText error>{helperTextPassword}</FormHelperText>
        </FormControl>

        <Box sx={{ width: '100%', color: 'black', display: 'flex', alignItems: 'center', }}>
          <Typography sx={{ pr: 1, fontSize: 15 }}>Forgot password?</Typography>
          <Link
            href="#"
            underline="always"
            sx={{
              fontSize: 15,
              color: 'blue'
            }}
          >
            Reset your password
          </Link>
        </Box>
        <Button
          onClick={onSubmit}
          variant='contained'
          style={{
            border: "none",
            outline: "none"
          }}
          sx={{
            boxShadow: 2,
            fontSize: 18,
            width: '100%',
            textTransform: 'none'
          }}>Log in</Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFetching}
        // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Divider style={{ width: '100%' }}>or</Divider>

        <Button
          variant='outlined'
          color='secondary'
          startIcon={<SvgIcon>
            <Logo />
          </SvgIcon>}
          sx={{
            fontSize: 18,
            width: '100%',
            color: 'black',
            textTransform: 'none',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: 'violet',
            }
          }}
        >
          Log in with google
        </Button>
        <Box sx={{ width: '100%', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ pr: 1, fontSize: 15 }}>Don't have an account?</Typography>
          <Link
            href="/signup"
            underline="always"
            sx={{
              fontSize: 15,
              color: 'blue'
            }}
          >
            Sign up
          </Link>
        </Box>
      </Stack>
    </Box >
  );
};

export default LoginForm;
