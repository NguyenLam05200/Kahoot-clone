import {
  Box,
  Stack,
  Slide,
  Typography,
  Grow,
  Zoom,
  IconButton,
  Button,
  Fab,
  ListItem,
  Link,
  Chip
} from '@mui/material'
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  gameSelector,
  setFullScreen,
  showResult,
  sumary,
  playAgain,
  clearState
} from './gameSlice';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { requestFullScreen } from '../../utils/utilities';

import ContactMailIcon from '@mui/icons-material/ContactMail';
import FiberNewIcon from '@mui/icons-material/FiberNew';


import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { parseJwt } from '../../utils/axios';


function CircularProgressWithLabel(props) {
  const size = '6.5rem';
  const thick = 6;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        thickness={thick}
        size={size}
        variant="determinate"
        {...props}
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      />
      <CircularProgress
        variant="determinate"
        value={100}
        style={{
          position: 'absolute',
          zIndex: 1,
          right: 0
        }}
        sx={{ color: '#063072' }}
        thickness={thick}
        size={size}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack textAlign='center' sx={{ color: 'white' }}>
          <Typography component="div" sx={{ fontSize: 15, fontWeight: 'bold' }}>
            {`${Math.round(props.value)}%`}
          </Typography>
          <Typography component="div" sx={{ fontSize: 15, }}>
            correct
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

function CircularProgressListItem(props) {
  const size = props.size;
  const thick = 8;
  const colorUnder = 'red';
  const colorFront = '#66BF39'
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        thickness={thick}
        size={size}
        variant="determinate"
        value={props.value}
        style={{
          position: 'relative',
          zIndex: 6,
        }}
        sx={{ color: colorFront }}
      />
      <CircularProgress
        variant="determinate"
        value={100}
        style={{
          position: 'absolute',
          zIndex: 1,
          right: 0
        }}
        sx={{ color: colorUnder }}
        thickness={thick}
        size={size}
      />
    </Box>
  );
}
function NestedList(props) {
  const { listQuestions } = useSelector(
    gameSelector
  );

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const reportDataAnalyst = props.reportDataAnalyst;
  return (
    <List
      sx={{
        px: 2,
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'auto',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {reportDataAnalyst.map((eachReport, index) => {
        return (
          <ListItem
            alignItems='flex-start'
            key={index}
            sx={{
              height: 120,
              my: 2,
              bgcolor: 'white',
              borderRadius: 0.5,
              p: 0.3,
            }}
          >
            <ListItemAvatar sx={{ p: 0, m: 0, width: 170, height: '100%', }}>
              <Avatar sx={{ width: '100%', height: '100%', borderRadius: 0.5 }} alt="Image alt" src={listQuestions[eachReport[0]].img} variant="square" />
            </ListItemAvatar>
            <Box sx={{ py: 1, px: 1, width: '100%', height: '100%' }}>
              <Stack sx={{ height: 'calc(100% - 40px)' }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: 'grey',
                  }}>
                  {eachReport[0] + 1 + ' -  ' + listQuestions[eachReport[0]].type}
                </Typography>
                <Typography
                  sx={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}
                  component="span"
                >
                  {listQuestions[eachReport[0]].text}
                </Typography>
              </Stack>
              <Box
                sx={{
                  width: ' 100%',
                  height: 40,
                  display: 'flex'
                }}
              >
                <Stack
                  textAlign='center'
                  direction='row'
                  spacing={1}
                  sx={{
                    width: '50%',
                    height: '100%',
                  }}
                >
                  <CircularProgressListItem value={eachReport[1]} size={40} />
                  <Typography sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 15,
                  }}>
                    {eachReport[1]} % correct.
                  </Typography>
                </Stack>
                <Stack
                  textAlign='center'
                  direction='row-reverse'
                  spacing={1}
                  sx={{
                    width: '50%',
                    height: '100%',
                  }}
                >
                  <Typography
                    onClick={() => setOpen(!open)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 15,
                      cursor: 'pointer'
                    }}>
                    Show answers
                    {open ? <ExpandMore /> : < ExpandLess />}
                  </Typography>
                </Stack>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {/* <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItemButton>
                  </List> */}
                </Collapse>
              </Box>
            </Box>

          </ListItem>
        )
      })}
    </List>
  );
}

const Report = ({ }) => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { isFullScreen, percentRightTotal, reportData } = useSelector(
    gameSelector
  );

  const [isShowLogout, setIsShowLogout] = useState(false);
  const bgColorContent = '#083C8F'
  const reportDataAnalyst = reportData.filter(eachReport => eachReport[1] < 100);

  const navigate = useNavigate();
  const handleClickLogout = () => {
    delete localStorage.kahut_app_accessToken;
    dispatch(clearState())
    navigate('/login');
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: '#1150B2',
        display: 'flex',
        p: 2
      }}>
      <Box
        sx={{
          width: '15%',
        }}
      >
        <Box
          sx={{
            height: '10%',
          }}
        >
          <IconButton
            style={{
              fontWeight: 'bold',
              border: "none",
              outline: "none"
            }}
            aria-label="delete"
            size="medium"
            sx={{
              boxShadow: 2,
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                backgroundColor: 'pink',
              }
            }}
            onClick={() => dispatch(setFullScreen())}
          >
            {isFullScreen ? <FullscreenExitIcon fontSize="inherit" /> : < FullscreenIcon fontSize="inherit" />}
          </IconButton>
        </Box>
        <Box
          sx={{
            height: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pr: 2,
          }}
        >
          <Button
            onClick={() => dispatch(sumary())}
            variant='contained' color='error' sx={{ textTransform: 'none', fontSize: 16 }}>Back to podium</Button>
        </Box>

      </Box>
      <Box
        sx={{
          width: '70%',
          pl: 3,
        }}
      >
        <Stack
          direction='row'
          spacing={2}
          sx={{
            height: '25%',
            pt: 5,
          }}>
          <Box
            sx={{
              width: '60%',
              boxShadow: 5,
              backgroundColor: bgColorContent,
              borderRadius: 1,
              display: 'flex'
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: '8rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgressWithLabel
                value={percentRightTotal}
                sx={{
                  color: "#66BF39",
                }}
              />
            </Box>
            <Box
              sx={{
                height: '100%',
                width: 'calc(100% - 8rem)',
                p: 2,
                pb: 0.9,
              }}
            >
              <Typography
                sx={{
                  height: '40%',
                  fontSize: 25,
                  color: 'white',
                }}
              >
                Preactice makes perfect!
              </Typography>
              <Box
                sx={{
                  height: '60%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  width: '100%',
                }}
              >
                <Typography
                  sx={{ width: 'calc(100% - 5rem)', color: 'white', fontSize: 13 }}
                >
                  Let players improve results by competing against these scores
                </Typography>
                <Box
                  sx={{
                    width: '5rem',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Button
                    onClick={() => dispatch(playAgain())}
                    variant='contained' size='small' sx={{ textTransform: 'none', py: 0.5, px: 1, }} disableElevation>Play again</Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: '20%',
              boxShadow: 5,
              backgroundColor: bgColorContent,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                height: 'calc(100% - 2.5rem)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ContactMailIcon sx={{ fontSize: 70, color: 'yellow', }} />
            </Box>
            <Box
              sx={{
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                p: 0.9
              }}
            >
              <Button variant='contained' size='small' sx={{ textTransform: 'none', py: 0.5, px: 1, boxShadow: 4 }} disableElevation>Get feedback</Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: '20%',
              boxShadow: 5,
              backgroundColor: bgColorContent,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                height: 'calc(100% - 2.5rem)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <FiberNewIcon sx={{ fontSize: 75, color: '#24ff21', }} />
            </Box>
            <Box
              sx={{
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                p: 0.9
              }}
            >
              <Button variant='contained' sx={{ textTransform: 'none', py: 0.5, px: 1, boxShadow: 4, fontSize: '0.7em' }} disableElevation>Play new game</Button>
            </Box>
          </Box>
        </Stack>
        <Box
          sx={{
            height: '75%',
          }}>
          <Box
            sx={{
              height: '4rem',
              display: 'flex',
              px: 2,
              pt: 2,
            }}
          >
            <Box
              sx={{
                width: '70%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Difficult questions</Typography>
              <Typography sx={{
                color: 'black',
                backgroundColor: 'white',
                borderRadius: 1,
                textAlign: 'center',
                px: 2,
                m: 2, fontWeight: 'bold', fontSize: 20
              }}>
                {reportDataAnalyst.length}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '30%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Link
                to="/user/reports"
                underline="always"
                color="inherit"
                variant="body2"
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: 'yellow',
                  }
                }}
              >
                View full report
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: bgColorContent,
              height: 'calc(100% - 4rem)',
              boxShadow: 5,
              p: 2,
            }}
          >
            <NestedList reportDataAnalyst={reportDataAnalyst} />
          </Box>
        </Box>
      </Box >
      <Box
        ref={containerRef}
        sx={{
          overflow: 'hidden',
          width: '15%',
          pl: 2,
        }}
      >
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Fab
              onClick={() => setIsShowLogout(!isShowLogout)}
              variant="extended"
              style={{
                border: "none",
                outline: "none"
              }}
              size="small"
              sx={{
                textTransform: 'none',
                color: 'black',
                backgroundColor: 'white'
              }}>
              <AccountCircleIcon sx={{ mr: 1, color: 'blue' }} />
              {parseJwt(localStorage.kahut_app_accessToken).name}
            </Fab>
          </Box>
          <Slide direction="left" in={isShowLogout} container={containerRef.current}>
            <Button
              onClick={handleClickLogout}
              style={{
                border: "none",
                outline: "none",
                color: 'black',
                backgroundColor: 'white',
              }}
              sx={{
                textTransform: 'none',
                boxShadow: 5,
              }}
              variant="contained"
              endIcon={<LogoutIcon sx={{ color: 'red' }} />}
            >
              Sign out
            </Button>
          </Slide>
        </Stack>
      </Box>
    </Box >
  );
};

export default Report;
