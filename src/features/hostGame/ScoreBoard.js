import { Box, Typography, Stack, IconButton, Dialog, Button, DialogContent, Slide } from '@mui/material'
import { useState, useEffect, forwardRef } from 'react';

import { useSelector, useDispatch } from "react-redux";
import {
    gameSelector,
    setFullScreen
} from './gameSlice';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


const ScoreBoard = () => {
    const dispatch = useDispatch();
    const { isFullScreen, pin, scoreBoard } = useSelector(
        gameSelector
    );

    const [isVolumn, setIsVolumn] = useState(true);
    const [isShowMedia, setIsShowMedia] = useState(false);

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
        }}>
            <Box
                sx={{
                    height: 4 / 10,
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
                    <Box sx={{ p: 2 }}>
                        <Stack spacing={0} alignItems="center">
                            <Typography
                                sx={{
                                    color: 'black',
                                    backgroundColor: 'white',
                                    borderRadius: 2,
                                    py: 1,
                                    px: 2,
                                    mb: 1,
                                }}
                                variant="h3" align='center' fontWeight='bold'>
                                Scoreboard
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: 22,
                                    fontFamily: [
                                        'Chilanka',
                                        'cursive',
                                    ].join(','),
                                }}
                                align='center' fontWeight='bold'>
                                Kahut!
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'white',
                                }}
                                align='center' fontWeight='bold'>
                                Basic edition!
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
                <Box sx={{
                    width: '10%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'right',
                    display: 'grid',
                    py: 2,
                }}>
                    <Button variant='contained' sx={{
                        textTransform: 'none',
                        backgroundColor: 'white',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: 'purple',
                            color: 'white',
                            fontWeight: 'bold',
                        }
                    }}>Next</Button>
                </Box>
            </Box>
            <Box
                sx={{
                    height: '55%',
                    px: 2,
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                }}
            >
                <Stack spacing={2} sx={{ height: '100%', width: '60%', alignItems: 'center', py: 2 }}>
                    {scoreBoard.length === 0
                        ?
                        <Typography width='90%' sx={{ fontSize: 25, textAlign: 'left', fontWeight: 'bold' }}>Every one have been 0 points</Typography>
                        :
                        scoreBoard.map((eachResult, index) => (

                            <Stack
                                key={index}
                                direction='row'
                                sx={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    py: 1,
                                    px: 3,
                                    borderRadius: 1,
                                }}
                            >
                                <Typography width='90%' sx={{ fontSize: 25, textAlign: 'left', fontWeight: 'bold' }}>{eachResult.name}</Typography>
                                <Typography width='10%' sx={{ fontSize: 25, textAlign: 'right' }}>{eachResult.score}</Typography>
                            </Stack>
                        ))
                    }
                </Stack>
            </Box >
            <Box
                sx={{
                    height: '5%',
                    boxShadow: 5,
                    px: 2,
                    display: 'flex',
                    backgroundColor: '#F2F2F2'
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

export default ScoreBoard;
