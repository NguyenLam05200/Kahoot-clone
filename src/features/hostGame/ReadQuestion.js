import { Box, Typography, Stack, IconButton, LinearProgress, Button } from '@mui/material'
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import {
    gameSelector,
    setFullScreen,
    chooseAnswer
} from './gameSlice';

import SquareIcon from '@mui/icons-material/Square';
import HexagonIcon from '@mui/icons-material/Hexagon';
import CircleIcon from '@mui/icons-material/Circle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import { logoPhone } from '../../components/AnswerUI';


const ReadQuestion = () => {
    const [progress, setProgress] = useState(0);

    const dispatch = useDispatch();
    const { isFullScreen, timeReadQuestion, listQuestions, curQuestion } = useSelector(
        gameSelector
    );

    useEffect(() => {
        const interval1 = setInterval(() => {
            setProgress((old) => old + 0.01);
        }, (timeReadQuestion + 1000) / 100);

        return () => clearInterval(interval1);
    }, []);

    const [count, setCount] = useState(timeReadQuestion / 1000);
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

                    px: 2,
                    display: 'flex'
                }}
            >
                <Box sx={{
                    width: '60%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'left',
                    display: 'flex',
                }}>
                    <IconButton
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            fontWeight: 'bold',
                            border: "none",
                            outline: "none"
                        }}
                        aria-label="delete"
                        size="medium"
                        onClick={() => dispatch(setFullScreen())}
                    >
                        {isFullScreen ? <FullscreenExitIcon fontSize="inherit" /> : < FullscreenIcon fontSize="inherit" />}
                    </IconButton>
                </Box>
                <Box sx={{
                    width: '40%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    display: 'flex',
                }}>
                    <Box sx={{
                        py: 1,
                        px: 3,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        display: 'flex',
                        backgroundColor: '#1150B2',
                        borderRadius: 5,
                        color: 'white'
                    }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: 20,
                        }}>
                            {curQuestion ? curQuestion + 1 : 1} of {listQuestions.length}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    height: 8 / 10,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stack spacing={15} alignItems="center">
                    <IconButton
                        component='div'
                        style={{

                            backgroundColor: '#0A3A72',
                            color: 'black',
                            fontWeight: 'bold',
                            outline: "none",
                            width: 'calc(6vh + 8vw)',
                            height: 'calc(6vh + 6vw)',
                        }}
                        aria-label="delete"
                        size="medium"
                    >
                        <Box sx={{
                            borderRadius: 2,
                            borderTop: 5,
                            borderBottom: 5,
                            borderRight: 8,
                            borderLeft: 8,
                            backgroundColor: 'white',
                            width: 165,
                            height: 82,
                            p: 1,
                            display: 'grid',
                            gap: 1,
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            animation: "spin 8s linear infinite",
                            "@keyframes spin": {
                                "0%": {
                                    transform: "rotate(70deg)",
                                },
                                "100%": {
                                    transform: "rotate(70deg)",
                                },
                            },
                        }}
                        >
                            {Array.from(Array(4)).map((_, index) => (
                                <Button
                                    key={index}
                                    style={{
                                        backgroundColor: logoPhone[index].bgColor,
                                        border: "none",
                                        outline: "none",
                                    }}
                                    sx={{
                                        color: 'white',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        display: 'flex',
                                        height: 24,
                                    }}
                                >
                                    {logoPhone[index].icon}
                                </Button>
                            ))}
                        </Box>
                    </IconButton>
                    <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
                        <Typography
                            sx={{
                                color: 'black',
                            }}
                            variant="h5" align='left' fontWeight='bold'>
                            {/* Name of these fruits: 🍏🍌🍍 ? */}
                            {listQuestions[curQuestion].ques_title}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <Box
                sx={{
                    height: 1 / 10,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                }}
            >
                <Box sx={{
                    mx: 1,
                    p: 1,
                    borderRadius: 5,
                    width: progress,
                    backgroundColor: 'white',
                }} />
                {/* <Box sx={{ width: '100%', color: '#fff' }}>
                    <LinearProgress color='inherit' variant='determinate' value={progress} thickness={10}
                    />
                </Box> */}
            </Box>
        </Box >
    );
};

export default ReadQuestion;
