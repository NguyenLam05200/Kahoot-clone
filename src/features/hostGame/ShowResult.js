import { Box, Typography, Stack, IconButton, Dialog, Button, DialogContent, Slide } from '@mui/material'
import { useState, useEffect, forwardRef } from 'react';

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
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { requestFullScreen } from '../../utils/utilities';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let fontSizeIcon = 40
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

const answerUI2 = [
    {
        icon: <SquareIcon />,
        bgColor: '#e21b3c'
    },
    {
        icon: <FavoriteIcon />,
        bgColor: '#1367cd'
    },
    {
        icon: <HexagonIcon />,
        bgColor: '#d89e00'
    },
    {
        icon: <CircleIcon />,
        bgColor: '#26890c'
    },
    {
        icon: <CloudIcon />,
        bgColor: '#0aa3a3'
    },
    {
        icon: <DarkModeIcon />,
        bgColor: '#864cbf'
    },
    {
        icon: <ChurchIcon />,
        bgColor: '#dad3db'
    },
    {
        icon: <DeviceHubIcon />,
        bgColor: '#e646cc'
    },
]

const correctAns = 2;
const playerAns = [0, 3, 2, 5]

const ShowResult = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isVolumn, setIsVolumn] = useState(true);
    const [isShowMedia, setIsShowMedia] = useState(false);

    const handleFullScreen = () => {
        setIsFullScreen(!isFullScreen)
        requestFullScreen();
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
                            onClick={handleFullScreen}
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
                    <Button variant='contained' sx={{ textTransform: 'none' }}>Next</Button>
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
                    {playerAns.map((total, index) => (
                        <Box
                            sx={{
                                width: '12vw',
                                height: total / Math.max(...playerAns) * (92 / 100),
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
                                {index === correctAns && <DoneIcon />}
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
                                src="https://images.unsplash.com/photo-1586343061001-b61e47c9b7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
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
                            px: 2,
                            opacity: index === correctAns ? 2 : 0.3,
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
                                variant="h5" align='center' fontWeight='bold'>
                                {index + 1 + ' tỉ năm'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', width: 'auto', justifyContent: 'right' }}>
                            {index === correctAns ? <DoneIcon fontSize='large' /> : <ClearIcon fontSize='large' />}
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
                    kahut.it Game PIN: 3477550
                </Typography>
            </Box>
        </Box >
    );
};

export default ShowResult;
