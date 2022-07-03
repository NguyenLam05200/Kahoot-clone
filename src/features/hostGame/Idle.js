import { Box, Typography, Stack, Slide, Zoom, Button } from '@mui/material'
import { useState, useEffect } from 'react';
import { logoAnimate } from '../../components/AnswerUI';

const Idle = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

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
                                backgroundColor: logoAnimate[index].bgColor,
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
                            {logoAnimate[index].icon}
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
