import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import {
  signupUser,
  userSelector,
  clearState
} from './userSlice';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Box,
  Stack, IconButton, Button, Divider, Link, Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Collapse
} from '@mui/material';
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
import { Link as LinkRoute } from 'react-router-dom';

const SignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
  const [openDialog, setOpenDialog] = useState(false);

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
      window.setTimeout(function () {
        if (open) {
          setOpen(false)
        }
      }, 3000);
    }

    if (isSuccess) {
      dispatch(clearState());
      setOpenDialog(true);

    }
  }, [isError, isSuccess]);

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

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        }}>{t("Sign up")}</Typography>
        {
          open &&
          <Collapse in={open}>
            <Alert severity="error">{errorMessage}</Alert>
          </Collapse>
        }

        {/* <Snackbar
          open={open}
          autoHideDuration={2000}
          message={errorMessage}
          onClose={handleClose}
        // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar> */}

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Register successfully!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Go to login page
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={() => navigate('/login')} autoFocus>
              {t("Log in")}
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{
          display: 'flex',
          width: '100%',
        }}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">{t("Full name")}</InputLabel>
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
            <InputLabel htmlFor="outlined-adornment-password">{t("Password")}</InputLabel>
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
            <InputLabel htmlFor="outlined-adornment-confirm-password">{t("Confirm password")}</InputLabel>
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
            }}>{t("Sign up")}</Button>
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
            {t("Sign up with google")}
          </Button>
        </Stack>

        <Box sx={{ width: '100%', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ pr: 1, fontSize: 15 }}>{t("Already have an account")}?</Typography>
          <Link
            component={LinkRoute}
            to="/login"
            underline="always"
            sx={{
              fontSize: 15,
              color: 'blue'
            }}
          >
            {t("Login")}
          </Link>
        </Box>

      </Stack>
    </Box >
  );
};

export default SignupForm;
