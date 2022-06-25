import { Box, Stack, Paper, Grid, Typography, Button } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles';

import { useSelector, useDispatch } from "react-redux";
import { playerSelector, timeUp, correctAns, incorrectAns, waitResult } from './playerSlice';

import SquareIcon from '@mui/icons-material/Square';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HexagonIcon from '@mui/icons-material/Hexagon';
import CircleIcon from '@mui/icons-material/Circle';
import ChurchIcon from '@mui/icons-material/Church';
import CloudIcon from '@mui/icons-material/Cloud';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { useEffect, useState } from 'react';
import { current } from '@reduxjs/toolkit';

const ChooseAnswer = ({ }) => {
  const { name, questions, curQuestion, score } = useSelector(
    playerSelector
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(timeUp());
    }, questions[curQuestion].timeLimit * 1000);
    return () => clearInterval(interval);
  }, []);

  const [curAns, setCurAns] = useState([]);

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
  const handleClickAns = (ans) => {
    setCurAns([...curAns, ans]);
    dispatch(waitResult());
  }

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
          <Button
            key={index}
            onClick={() => handleClickAns(index)}
            sx={{
              backgroundColor: curAns.includes(index) ? '#5a5253' : answerUI[index].bgColor,
              // backgroundColor: answerUI[index].bgColor,
              color: 'white',
              alignItems: "center",
              justifyContent: "center",
              display: 'flex',
              '&:hover': {
                backgroundColor: '#5a5253',
              }

            }}
          >
            {answerUI[index].icon}
          </Button>
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
        <Button variant="contained"
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

export default ChooseAnswer;
