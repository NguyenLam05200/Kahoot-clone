import { Box, Typography, Stack, IconButton, LinearProgress, Button } from '@mui/material'
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import {
    gameSelector,
    setFullScreen,
    showResult,
    skip
} from './gameSlice';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { requestFullScreen } from '../../utils/utilities';

import { answerUI } from '../../components/AnswerUI';


const ChooseAns = () => {
    const dispatch = useDispatch();
    const { isFullScreen, listQuestions, curQuestion, countAnswer, pin } = useSelector(
        gameSelector
    );

    const [isVolumn, setIsVolumn] = useState(true);
    const [countDown, setCountDown] = useState(listQuestions[curQuestion].time);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown((old) => old - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        countDown < 1 && dispatch(showResult())
    });

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#F2F2F2'
        }}>
            <Box
                sx={{
                    height: 2 / 10,
                    p: 2,
                    display: 'flex',
                }}
            >
                <Box sx={{
                    width: '10%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'left',
                    display: 'flex',
                }}>
                    <Stack spacing={2}>
                        <IconButton
                            style={{
                                fontWeight: 'bold',
                                // border: "none",
                                // outline: "none"
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
                        <IconButton
                            style={{
                                fontWeight: 'bold',
                                // border: "none",
                                // outline: "none"
                            }}
                            aria-label="delete"
                            size="medium"
                            sx={{
                                boxShadow: 3,
                                backgroundColor: 'white',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: 'purple',
                                    color: 'white',
                                }
                            }}
                            onClick={() => setIsVolumn(!isVolumn)}
                        >
                            {isVolumn ? <VolumeUpIcon fontSize="inherit" /> : < VolumeOffIcon fontSize="inherit" />}
                        </IconButton>
                    </Stack>
                </Box>
                <Box sx={{
                    width: '80%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'center',
                    display: 'flex',
                }}>
                    <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 3 }}>
                        <Typography
                            sx={{
                                color: 'black',
                            }}
                            variant="h5" align='center' fontWeight='bold'>
                            {listQuestions[curQuestion].ques_title}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: '10%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'right',
                    display: 'grid',
                }}>
                    <Button
                        onClick={() => dispatch(skip())}
                        variant='contained'
                        sx={{ textTransform: 'none' }}>Skip</Button>
                </Box>
            </Box>
            <Box
                sx={{
                    height: 5 / 10,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{
                    width: '10%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'left',
                    display: 'flex',
                }}>
                    <IconButton
                        style={{
                            backgroundColor: '#864CBF',
                            color: 'white',
                            fontWeight: 'bold',
                            outline: "none",
                            width: '5vw',
                            height: '5vw',
                            fontSize: '3vw',
                        }}
                        aria-label="countDown"
                        size="medium"
                    >
                        {countDown}
                    </IconButton>
                </Box>
                <Box sx={{
                    width: '80%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'center',
                    display: 'flex',
                }}>
                    <Box sx={{ backgroundColor: '#fff', p: 1, borderRadius: 2, boxShadow: 3 }}>
                        <Box
                            component="img"
                            sx={{
                                height: '45vh',
                                width: '50vw',
                            }}
                            alt="Sesame seeds"
                            src={listQuestions[curQuestion].img}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    width: '10%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'right',
                    display: 'grid',
                }}>
                    <Stack>
                        <Typography
                            sx={{
                                color: 'black',
                            }}
                            variant="h5" align='center' fontWeight='bold'>
                            {countAnswer}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'black',
                            }}
                            variant="h5" align='center' fontWeight='bold'>
                            Answers
                        </Typography>
                    </Stack>
                </Box>
            </Box>
            <Box
                sx={{
                    height: '25%',
                    boxShadow: 1,
                    px: 2,
                    py: 1,
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}
            >
                {listQuestions[curQuestion].ans.map((content, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: answerUI[index].bgColor,
                            color: 'white',
                            alignItems: "center",
                            justifyContent: "left",
                            display: 'flex',
                            borderRadius: 1,
                            px: 2,
                        }}
                    >
                        {answerUI[index].icon}
                        <Typography
                            sx={{
                                pl: 2,
                                color: 'white',
                                fontFamily: [
                                    'Chilanka',
                                    'cursive',
                                ].join(','),
                            }}
                            variant="h5" align='center' fontWeight='bold'>
                            {content}
                        </Typography>
                    </Box>
                ))}

            </Box>
            <Box
                sx={{
                    height: '5%',
                    boxShadow: 5,
                    px: 2,
                    display: 'flex',
                }}
            >
                <Typography variant='h6' sx={{
                    fontWeight: 'bold',
                    width: '30%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'left',
                    display: 'flex',
                }}>
                    {curQuestion + 1} / {listQuestions.length}
                </Typography>
                <Typography sx={{
                    marginLeft: 1,
                    fontWeight: 'bold',
                    width: '70%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'right',
                    display: 'flex',
                }}>
                    kahut.it Game PIN: {pin}
                </Typography>
            </Box>
        </Box >
    );
};

export default ChooseAns;
