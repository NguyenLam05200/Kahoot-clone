import { Box, Typography, Stack, IconButton, LinearProgress, Button } from '@mui/material'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SquareIcon from '@mui/icons-material/Square';
import HexagonIcon from '@mui/icons-material/Hexagon';
import CircleIcon from '@mui/icons-material/Circle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const fontSizeIcon = 15
const answerUI = [
    {
        icon: <SquareIcon sx={{ fontSize: fontSizeIcon }} />,
        bgColor: '#e21b3c'
    },
    {
        icon: <ChangeHistoryIcon sx={{ fontSize: fontSizeIcon }} />,
        bgColor: '#e646cc'
    },
    {
        icon: <HexagonIcon sx={{ fontSize: fontSizeIcon }} />,
        bgColor: '#d89e00'
    },
    {
        icon: <CircleIcon sx={{ fontSize: fontSizeIcon }} />,
        bgColor: '#26890c'
    }
]


const ReadQuestion = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
        }}>
            <Box
                sx={{
                    height: 1 / 10,
                    boxShadow: 5,
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
                        onClick={() => setIsFullScreen(!isFullScreen)}
                    >
                        {isFullScreen ? <FullscreenExitIcon fontSize="inherit" /> : < FullscreenIcon fontSize="inherit" />}
                    </IconButton>
                </Box>
                <Box sx={{
                    width: '40%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'right',
                    display: 'flex',
                }}>
                    <Box sx={{
                        py: 1,
                        px: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        backgroundColor: '#1150B2',
                        borderRadius: 5,
                        color: 'white'
                    }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: 20,
                        }}>
                            1 of 10
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
                        style={{
                            boxShadow: 5,
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
                            width: 'calc(8vh + 8vw)',
                            height: 'calc(5vh + 5vw)',
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
                        }}>
                            {Array.from(Array(4)).map((_, index) => (
                                <Button
                                    key={index}
                                    style={{
                                        backgroundColor: answerUI[index].bgColor,
                                        border: "none",
                                        outline: "none"
                                    }}
                                    sx={{
                                        color: 'white',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        display: 'flex',
                                        width: 'calc((8vh + 8vw)/2 - 2)',
                                        height: 'calc((5vh + 5vw)/2 - 2)',
                                    }}
                                >
                                    {answerUI[index].icon}
                                </Button>
                            ))}
                        </Box>
                    </IconButton>
                    <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
                        <Typography
                            sx={{
                                color: 'black',
                            }}
                            variant="h5" align='center' fontWeight='bold'>
                            Name of these fruits: 🍏🍌🍍 ?
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <Box
                sx={{
                    height: 1 / 10,
                    boxShadow: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                }}
            >
                <Box sx={{
                    mx: 1,
                    p: 1,
                    borderRadius: 5,
                    width: progress + '%',
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
