import { Box, Stack, Paper, Grid, Typography, Button } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles';

import { useSelector } from "react-redux";
import { playerSelector } from './playerSlice';

import SquareIcon from '@mui/icons-material/Square';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HexagonIcon from '@mui/icons-material/Hexagon';
import CircleIcon from '@mui/icons-material/Circle';
import ChurchIcon from '@mui/icons-material/Church';
import CloudIcon from '@mui/icons-material/Cloud';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

const StartGame = ({ }) => {
  const { name, questions, curQuestion, score } = useSelector(
    playerSelector
  );
  const fontSizeIcon = 40
  const answerUI = [
    {
      icon: <SquareIcon sx={{ fontSize: fontSizeIcon }} />,
      bgColor: '#e21b3c'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: fontSizeIcon }} />,
      bgColor: '#1367cd'
    },
    {
      icon: <HexagonIcon sx={{ fontSize: fontSizeIcon }} />,
      bgColor: '#d89e00'
    },
    {
      icon: <CircleIcon sx={{ fontSize: fontSizeIcon }} />,
      bgColor: '#26890c'
    },
    {
      icon: <CloudIcon sx={{ fontSize: fontSizeIcon }} />,
      bgColor: '#0aa3a3'
    },
    {
      icon: <DarkModeIcon sx={{ fontSize: fontSizeIcon }} />,
      bgColor: '#864cbf'
    },
    {
      icon: <ChurchIcon sx={{ fontSize: fontSizeIcon }} />,
      bgColor: '#dad3db'
    },
    {
      icon: <DeviceHubIcon sx={{ fontSize: fontSizeIcon }} />,
      bgColor: '#e646cc'
    },
  ]

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
    }}>
      <Box
        sx={{
          height: 1 / 10,
          boxShadow: 5,
          display: 'flex'
        }}
      >
        <Typography sx={{
          marginLeft: 1,
          fontWeight: 'bold',
          width: '15%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'left',
          display: 'flex',
        }}>
          {curQuestion ? curQuestion : 1} of {questions.length}
        </Typography>
        <Typography sx={{
          marginLeft: 1,
          fontWeight: 'bold',
          fontSize: 20,
          width: '70%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}>
          {curQuestion !== null ? questions[curQuestion].type : 'Type of question'}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 8 / 10,
          boxShadow: 1,
          p: 1,
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        {Array.from(Array(questions[curQuestion].totalAns)).map((_, index) => (
          <Box
            sx={{
              backgroundColor: answerUI[index].bgColor,
              color: 'white',
              alignItems: "center",
              justifyContent: "center",
              display: 'flex'
            }}
          >
            {answerUI[index].icon}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          height: 1 / 10,
          boxShadow: 5,
          display: 'flex'
        }}
      >
        <Typography sx={{
          marginLeft: 1,
          fontWeight: 'bold',
          width: '90%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'left',
          display: 'flex',
        }}>
          {name}
        </Typography>
        <Button variant="contained" component='typography'
          aria-disabled='true'
          sx={{
            m: 'auto',
            mx: 1,
            width: '8%',
            height: '60%',
            fontSize: 20,
            fontWeight: 'bold',
            backgroundColor: 'black',
            "&:hover": {
              backgroundColor: "black"
            },
            cursor: 'text'
          }}
        >{score}</Button>
      </Box>
    </Box >
  );
};

export default StartGame;
