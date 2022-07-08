import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  signupUser,
  userSelector,
  clearState
} from './userSlice';
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

import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';

import { ReactComponent as Logo } from "../../assets/images/icons/social-google.svg";
import { SvgIcon } from '@mui/material';


import { Howl, Howler } from 'howler';
import newSound from '../../assets/audio/test.wav'

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const SignupForm = ({ }) => {

  const navigate = useNavigate();

  const [sound, setSound] = useState(new Howl({ src: [newSound] }))

  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const [helperTextEmail, setHelperTextEmail] = useState('')
  const [helperTextName, setHelperTextName] = useState('')
  const [helperTextPassword, setHelperTextPassword] = useState('')
  const [helperTextConfirmPassword, setHelperTextConfirmPassword] = useState('')

  const [open, setOpen] = useState(false)


  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );

  const onSubmit = () => {
    setHelperTextName('')
    setHelperTextEmail('')
    setHelperTextPassword('')
    setHelperTextConfirmPassword('')


    let isValid = true;

    if (values.name.trim() === '') {
      setHelperTextName('Please fill in full name field!')
      isValid = false;
    }

    if (values.email.trim() === '') {
      setHelperTextEmail('Please fill in email field!')
      isValid = false;
    }

    if (values.password.trim() === '') {
      isValid = false;
      setHelperTextPassword('Please fill in password field!')
    }

    if (values.confirmPassword.trim() === '') {
      isValid = false;
      setHelperTextConfirmPassword('Please fill in confirm password field!')
    } else if (values.confirmPassword.trim() !== values.password.trim()) {
      isValid = false;
      setHelperTextConfirmPassword("Password doesn't match!")
    }

    if (isValid) {
      const emailInput = values.email.trim();
      const sliceLowerCase = emailInput.slice(-10).toLocaleLowerCase();
      const dataInput = {
        email: sliceLowerCase === '@gmail.com' ? emailInput.slice(0, -10) + '@gmail.com' : emailInput + '@gmail.com',
        password: values.password.trim(),
        name: values.name,
      }
      dispatch(signupUser(dataInput));
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
      alert('success')
      // navigate(-1);
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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        boxShadow: 5,
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 2,
        minWidth: 300,
        width: 700,
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
        }}>Sign up</Typography>
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



        <Box sx={{
          display: 'flex',
          width: '100%',
        }}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Full name</InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-name"
              value={values.name}
              onChange={handleChange('name')}
              aria-describedby="outlined-email-helper-text"
              label="Full name"
            />
            <FormHelperText error>{helperTextName}</FormHelperText>
          </FormControl>
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
        </Box>
        <Box sx={{
          display: 'flex',
          width: '100%',
        }}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
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
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm password</InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-confirm-password"
              type={values.showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm password"
            />
            <FormHelperText error>{helperTextConfirmPassword}</FormHelperText>
          </FormControl>
        </Box>

        <Stack direction='row' alignItems='center' sx={{
          height: 100,
          width: '100%',
          p: 1,
        }}>
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
              width: '50%',
              textTransform: 'none'
            }}>Sign up</Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isFetching}
          // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <Divider orientation='vertical' flexItem  >or</Divider>

          <Button
            variant='outlined'
            color='secondary'
            startIcon={<SvgIcon>
              <Logo />
            </SvgIcon>}
            sx={{
              fontSize: 18,
              width: '50%',
              color: 'black',
              textTransform: 'none',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: 'violet',
              }
            }}
          >
            Sign up with google
          </Button>
        </Stack>

        <Box sx={{ width: '100%', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ pr: 1, fontSize: 15 }}>Already have an account?</Typography>
          <Link
            href="/login"
            underline="always"
            sx={{
              fontSize: 15,
              color: 'blue'
            }}
          >
            Login
          </Link>
        </Box>
      </Stack>
    </Box >
  );
};

export default SignupForm;
