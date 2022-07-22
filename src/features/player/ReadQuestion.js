import { Box, Stack, Typography, Button } from '@mui/material'

import { useSelector, useDispatch } from "react-redux";
import { playerSelector, chooseAnswer } from './playerSlice';
import { useState, useEffect } from 'react';

const ReadQuestion = () => {
  const { name, questions, curQuestion, score, timeReadQuestion } = useSelector(
    playerSelector
  );

  const [count, setCount] = useState(timeReadQuestion / 1000); //2
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    count < 0 && dispatch(chooseAnswer())
  })

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
          {curQuestion ? curQuestion + 1 : 1} of {questions.length}
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
          {curQuestion !== null ? questions[curQuestion].type : questions[questions.length - 1].type}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 8 / 10,
          width: '100%',
          bgcolor: '#46178F',
          display: 'inline-grid',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}
      >
        <Box component='div' justifyContent='center' alignItems='center'  >
          <Stack spacing={5} alignItems="center">
            <Typography variant="h2" align='center' fontWeight='500' fontFamily='Segoe UI'>Question {curQuestion + 1}</Typography>
            <Typography variant="h2" align='center' fontWeight='500' fontFamily='Segoe UI'>{count < 0 ? 'Start!' : count}</Typography>
            <Typography variant="h4" align='center' fontWeight='bold'>
              Loading
              {count % 3 === 1 && ' .'}
              {count % 3 === 0 && ' ..'}
              {count % 3 === 2 && ' ...'}
            </Typography>
          </Stack>
        </Box>
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

export default ReadQuestion;
