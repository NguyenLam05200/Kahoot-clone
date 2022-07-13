import { Chip, Box, Stack, Grid, Paper, Button, Typography, Link, Divider } from '@mui/material'
import Navbar from "../user/Navbar";
import AddIcon from '@mui/icons-material/Add';
import {
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { parseJwt } from '../../utils/axios';
import { Link as Linkx } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllRoom,
  roomSelector,
} from './roomSlice';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Play demo game', 'Create a Kahut', 'Host kahut'];
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey'
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera'
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee'
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats'
  },
]
const itemData2 = [

  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball'
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern'
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms'
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil'
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star'
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike'
  }
]

const Dashboard = () => {
  const { listRoom } = useSelector(
    roomSelector
  );
  const navigate = useNavigate();

  const theme = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!listRoom) {
      dispatch(getAllRoom())
    }
  }, [])

  return (
    <Grid rowSpacing={2} columnSpacing={0} container my={1}
      sx={{ backgroundColor: '#fafafa' }}
    // justifyContent="center"
    // alignItems="center"
    >
      <Grid item xs={4}>
        <Box
          sx={{
            m: 2,
            p: 2,
            boxShadow: 3,
            backgroundColor: 'white',
            borderRadius: 1,
          }}
        >
          <Button
            size='small'
            variant="contained"
            sx={{
              textTransform: 'none',
            }}
            endIcon={<AddIcon />}>
            Add name
          </Button>
          <Typography variant="subtitle2" sx={{ py: 1 }}>
            {parseJwt(localStorage.kahut_app_accessToken).name}
          </Typography>
          <Box sx={{
            width: '100%',
            display: 'flex',
            backgroundColor: '#f2f2f2',
            boxShadow: 2,
            my: 2,
            px: 2,
            color: '#6e6e83',
          }}>
            <Typography variant="subtitle2" sx={{ width: '50%', py: 1 }}>
              Plan:
            </Typography>

            <Link
              component='span'
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
              sx={{ width: '50%', py: 1, textAlign: 'right', color: '#6e6e83', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Pro vjp
            </Link>
          </Box>
          <Box sx={{
            width: '100%',
            display: 'flex',
            backgroundColor: '#f2f2f2',
            boxShadow: 2,
            px: 2,
            color: '#6e6e83',
          }}>
            <Typography variant="subtitle2" sx={{ width: '50%', py: 1 }}>
              My interests:
            </Typography>

            <Link
              component='span'
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
              sx={{ width: '50%', py: 1, textAlign: 'right', color: '#6e6e83', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Add interests
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            m: 2,
            p: 2,
            boxShadow: 3,
            backgroundColor: 'white',
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ py: 1, fontWeight: 'bold' }}>
            Assignments
          </Typography>
          <Divider />
          <Box textAlign='center' sx={{
            width: '100%',
            backgroundColor: '#f2f2f2',
            boxShadow: 1,
            borderRadius: 1,
            mt: 2,
            px: 2,
            color: '#6e6e83',
          }}>
            <Typography variant="subtitle2" sx={{ width: '100%', p: 3, textAlign: 'center' }}>
              Self-paced kahoots are perfect for e-learning as remote workers play independently at a time that suits them.
            </Typography>

            <Button variant='contained' size='small' sx={{ mb: 2 }}>Learn more</Button>
          </Box>
        </Box>
        <Box
          sx={{
            m: 2,
            p: 2,
            boxShadow: 3,
            backgroundColor: 'white',
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ py: 1, fontWeight: 'bold' }}>
            My kahuts
          </Typography>
          <Divider />
          {listRoom.map((eachRoom, index) => {
            if (index < 3) {
              return (
                <Box
                  onClick={() => navigate(`/user/details/${eachRoom._id}`)}
                  key={index} sx={{
                    width: '100%',
                    height: '6rem',
                    border: '1px solid grey',
                    boxShadow: 1,
                    borderRadius: 1,
                    mt: 2,
                    display: 'flex',
                    cursor: 'pointer'
                  }}>
                  <Box sx={{
                    width: '40%',
                    height: '100%',
                    backgroundImage: `url(${eachRoom.quizImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    textAlign: 'center',
                    alignItems: "justify-end",
                  }}>
                  </Box>
                  <Box sx={{
                    width: '60%',
                    height: '100%',
                    display: 'grid',
                    alignItems: 'center',
                    mx: 1
                  }}>
                    <Typography sx={{ pt: 1, width: '100%', fontSize: 18, fontWeight: 'bold' }}>
                      {eachRoom.quizTitle}
                    </Typography>
                    <Stack spacing={1} direction='row' sx={{ py: 1, width: '100%' }}>
                      <Chip label={eachRoom.questions.length + " questions"} variant='outlined' size="small" color="info" sx={{ width: '50%', fontWeight: 'bold', fontSize: 14 }} />
                      <Chip label={eachRoom.plays + " plays"} variant='outlined' size="small" color="secondary" sx={{ width: '50%', fontWeight: 'bold', fontSize: 14 }} />
                    </Stack>
                  </Box>
                </Box>
              )
            }
          })}
          <Box textAlign='center' mt={2}>
            <Link
              component='span'
              variant="body2"
              onClick={() => navigate('/user/library')}
              sx={{ my: 5, textAlign: 'right', color: 'info', fontWeight: 'bold', cursor: 'pointer' }}
            >
              See all ({listRoom.length})
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box p={3} bgcolor='success.light' justifyContent='center' display={'flex'}
          sx={{
            m: 2,
            boxShadow: 3,
            backgroundColor: 'pink',
            borderRadius: 1,
          }} >
          <Button color='inherit'>Quảng cáo</Button>
        </Box>
        <Box p={3} bgcolor='success.light' justifyContent='center' display={'flex'}
          sx={{
            m: 2,
            boxShadow: 3,
            backgroundColor: '#abdba7',
            borderRadius: 1,
            color: 'white'
          }} >
          <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        </Box>
        <Box p={3} bgcolor='success.light'
          sx={{
            m: 2,
            boxShadow: 3,
            // backgroundColor: '#abdba7',
            borderRadius: 1,
            color: 'white',
            display: 'flex'
          }} >
          <Box bgColor='success' width='50%' marginRight={2}>
            <Stack spacing={2} >
              {itemData.map((item, index) => (
                <Card key={index} sx={{ display: 'flex' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {item.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                      <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                      </IconButton>
                      <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                      </IconButton>
                      <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                      </IconButton>
                    </Box>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={item.img}
                    alt="Live from space album cover"
                  />
                </Card>
              ))}
            </Stack>
          </Box>
          <Box bgColor='success' width='50%'>
            <Stack spacing={2} >
              {itemData2.map((item, index) => (
                <Card key={index} sx={{ display: 'flex' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {item.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                      <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                      </IconButton>
                      <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                      </IconButton>
                      <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                      </IconButton>
                    </Box>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={item.img}
                    alt="Live from space album cover"
                  />
                </Card>
              ))}
            </Stack>
          </Box>

        </Box>

      </Grid>
    </Grid>
  );
};

export default Dashboard;
