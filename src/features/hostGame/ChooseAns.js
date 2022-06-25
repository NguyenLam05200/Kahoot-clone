import { Box, Typography, Stack, IconButton, LinearProgress, Button } from '@mui/material'
import { useState, useEffect } from 'react';

import SquareIcon from '@mui/icons-material/Square';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HexagonIcon from '@mui/icons-material/Hexagon';
import CircleIcon from '@mui/icons-material/Circle';
import ChurchIcon from '@mui/icons-material/Church';
import CloudIcon from '@mui/icons-material/Cloud';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

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


const ChooseAns = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isVolumn, setIsVolumn] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            progress > 1 ? setProgress(0) : setProgress((progress) => progress + 0.002);
        }, 1);
        return () => clearInterval(interval);
    });

    const requestFullScreen = () => {
        setIsFullScreen(!isFullScreen)
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

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
                            onClick={requestFullScreen}
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
                            Bao lâu bán đuợc 1 tỉ gói mè 😐?
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
                    <Button variant='contained' sx={{ textTransform: 'none' }}>Skip</Button>
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
                        11
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
                            src="https://images.unsplash.com/photo-1586343061001-b61e47c9b7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
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
                            0
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
                {Array.from(Array(4)).map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: answerUI[index].bgColor,
                            color: 'white',
                            alignItems: "center",
                            justifyContent: "left",
                            display: 'flex',
                            borderRadius: 1,
                            px: 2
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
                            {index + 1 + ' tỉ năm'}
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
                    kahut.it Game PIN: 3477550
                </Typography>
            </Box>
        </Box >
    );
};

export default ChooseAns;
