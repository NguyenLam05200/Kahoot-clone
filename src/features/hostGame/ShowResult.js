import { Box, Typography, Stack, IconButton, Dialog, Button, DialogContent, Slide } from '@mui/material'
import { useState, useEffect, forwardRef } from 'react';

import socket from '../../utils/socket';
import { useSelector, useDispatch } from "react-redux";
import {
    gameSelector,
    setFullScreen,
    requestScoreboard
} from './gameSlice';


import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import { answerUI, answerUI2 } from '../../components/AnswerUI';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




const ShowResult = () => {
    const dispatch = useDispatch();
    const { isFullScreen, listQuestions, curQuestion, countEachAns, pin } = useSelector(
        gameSelector
    );
    const [isVolumn, setIsVolumn] = useState(true);
    const [isShowMedia, setIsShowMedia] = useState(false);

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
                        onClick={() => dispatch(requestScoreboard())}
                        variant='contained'
                        sx={{ textTransform: 'none' }}>Next</Button>
                </Box>
            </Box>
            <Box
                sx={{
                    height: '45%',
                    px: 2,
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                }}
            >
                <Stack spacing={2} direction='row' sx={{ height: '100%', alignItems: 'end', py: 2 }}>
                    {countEachAns.map((total, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '12vw',
                                height: total / Math.max(...countEachAns) * (92 / 100),
                                minHeight: 30,
                                minWidth: 80,
                                backgroundColor: answerUI2[index].bgColor,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'end',
                                color: 'white',
                                py: 0.5,
                                borderRadius: 1,
                            }}
                        >
                            <Stack spacing={1} direction='row' sx={{ alignItems: 'center', fontSize: 25 }}>
                                {answerUI2[index].icon}
                                <Typography sx={{ fontWeight: 'bold' }} >
                                    {total}
                                </Typography>
                                {listQuestions[curQuestion].correctAns.includes(index) && <DoneIcon />}
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Box >
            <Box
                sx={{
                    height: '5%',
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    onClick={() => setIsShowMedia(true)}
                    variant='contained'
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 'bold'
                    }}>Show media</Button>
                <Dialog
                    open={isShowMedia}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setIsShowMedia(false)}
                >
                    <DialogContent>
                        <Box sx={{ backgroundColor: '#fff', p: 1, borderRadius: 2, boxShadow: 3 }}>
                            <Box
                                component="img"
                                sx={{
                                    height: '45vh',
                                    width: '40vw',
                                }}
                                alt="Sesame seeds"
                                src={listQuestions[curQuestion].img}
                            />
                        </Box>
                    </DialogContent>
                </Dialog>
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
                            opacity: listQuestions[curQuestion].correctAns.includes(index) ? 2 : 0.3,
                        }}
                    >
                        <Box sx={{
                            width: '90%',
                            alignItems: "center",
                            justifyContent: "left",
                            display: 'flex',
                        }}>
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
                                variant="h5" align='left' fontWeight='bold'>
                                {content}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', width: 'auto', justifyContent: 'right' }}>
                            {listQuestions[curQuestion].correctAns.includes(index) ? <DoneIcon fontSize='large' /> : <ClearIcon fontSize='large' />}
                        </Box>
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
                    1/10
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

export default ShowResult;
