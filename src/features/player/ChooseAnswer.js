import { Box, Typography, Button } from '@mui/material'

import { useSelector, useDispatch } from "react-redux";
import { playerSelector, timeUp, sendResult } from './playerSlice';

import { useEffect, useState } from 'react';
import { answerUI } from '../../components/AnswerUI';

const ChooseAnswer = () => {
  const { name, questions, curQuestion, score } = useSelector(
    playerSelector
  );

  const dispatch = useDispatch();

  const [countDown, setCountDown] = useState(questions[curQuestion].timeLimit);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((old) => old - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    countDown < 1 && dispatch(timeUp())
  });

  const [curAns, setCurAns] = useState([]);

  const handleClickAns = (ans) => {
    if (!curAns.includes(ans)) {
      setCurAns([...curAns, ans]);
    }
    if (questions[curQuestion].type !== 'Multi selections') {
      dispatch(sendResult([ans]));
    }
  }

  const handleSubmitMultiSelections = () => {
    dispatch(sendResult(curAns));
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
              backgroundColor: answerUI[index].bgColor,
              opacity: curAns.includes(index) ? 0.3 : 2,
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
          width: '30%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'left',
          display: 'flex',
        }}>
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '40%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {questions[curQuestion].type === 'Multi selections' &&
            <Button
              variant='contained'
              onClick={handleSubmitMultiSelections}
            >Submit</Button>
          }
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '30%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained"
            aria-disabled='true'
            sx={{
              m: 'auto',
              mx: 1,
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

      </Box>
    </Box >
  );
};

export default ChooseAnswer;
