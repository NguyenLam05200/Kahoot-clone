import { Box, Typography, Stack, Slide, Zoom, Button } from '@mui/material'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { gameSelector, loadingPin } from './gameSlice';


import SquareIcon from '@mui/icons-material/Square';
import HexagonIcon from '@mui/icons-material/Hexagon';
import CircleIcon from '@mui/icons-material/Circle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
const Idle = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const fontSizeIcon = 40
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
    return (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack spacing={7} alignItems="center">
                <Box sx={{
                    borderRadius: 2,
                    backgroundColor: 'white',
                    width: 'calc(10vh + 10vw)',
                    height: 'calc(10vh + 10vw)',
                    m: 5,
                    p: 1,
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    animation: "spin 5s linear infinite",
                    "@keyframes spin": {
                        "0%": {
                            transform: "rotate(0deg)",
                        },
                        "45%": {
                            transform: "rotate(360deg)",
                        },
                        "55%": {
                            transform: "rotate(360deg)",
                        },
                        "100%": {
                            transform: "rotate(90deg)",
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
                                display: 'flex'
                            }}
                        >
                            {answerUI[index].icon}
                        </Button>
                    ))}
                </Box>
                <Typography
                    sx={{
                        color: 'white',
                        fontFamily: [
                            'Chilanka',
                            'cursive',
                        ].join(','),
                    }}
                    variant="h3" align='center' fontWeight='bold'>
                    Loading
                    {count % 3 === 0 && ' .'}
                    {count % 3 === 1 && ' ..'}
                    {count % 3 === 2 && ' ...'}
                </Typography>
            </Stack>
        </Box>
    );
};

export default Idle;
