import { Box, Typography, Stack, Slide, Zoom, Button, Divider } from '@mui/material'
import { useState, useEffect } from 'react';
import LoopIcon from '@mui/icons-material/Loop';

const LoadingPin = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);
        return () => clearInterval(interval);
    });
    return (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack spacing={7} alignItems="center">
                <Typography
                    sx={{
                        color: 'white',
                        fontFamily: [
                            'Chilanka',
                            'cursive',
                        ].join(','),
                    }}
                    variant="h3" align='center' fontWeight='bold'>
                    Get ready to join
                </Typography>
                <Box sx={{
                    borderRadius: 2,
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Typography
                        sx={{
                            p: 1,
                            m: 1,
                            width: '18vw',
                            fontSize: 18,
                        }}
                        variant="h6" align='center' fontWeight='bold'>
                        Join at www.kahut.it or with the Kahut! app
                    </Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button
                        style={{
                            backgroundColor: 'black',
                            border: "none",
                            outline: "none"
                        }}
                        sx={{
                            color: 'white',
                            animation: "spin 8s linear infinite",
                            textTransform: 'none',
                            fontWeight: 800,
                            fontSize: 18,
                            pl: 1,
                            pr: 4 - count % 3,
                            mx: 2,
                            fontFamily: [
                                'cursive',
                            ].join(','),
                            "@keyframes spin": {
                                "0%": {
                                    transform: "rotate(-4deg)",
                                },
                                "100%": {
                                    transform: "rotate(-4deg)",
                                }
                            },
                        }}
                        startIcon={
                            <LoopIcon size="large" fontSize="inherit" sx={{
                                ml: 1,
                                animation: "tin 2s linear infinite",
                                "@keyframes tin": {
                                    "0%": {
                                        transform: "rotate(0deg)",
                                    },
                                    "100%": {
                                        transform: "rotate(360deg)",
                                    }
                                },
                            }} />
                        }
                    >
                        Loading Game PIN
                        {count % 3 === 0 && ' .'}
                        {count % 3 === 1 && ' ..'}
                        {count % 3 === 2 && ' ...'}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default LoadingPin;
