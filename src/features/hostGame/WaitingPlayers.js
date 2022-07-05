import { useState, useEffect } from 'react';

import { gameSelector, setBlockJoin, startGame } from './gameSlice';
import { useSelector, useDispatch } from "react-redux";

import { Box, Typography, Stack, IconButton, Zoom, Button, Divider, Grid, Paper } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import styled from '@emotion/styled';

const WaitingPlayers = () => {
    const { pin, isBlockJoin, listPlayers } = useSelector(
        gameSelector
    );
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);
        return () => clearInterval(interval);
    });

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack style={{ width: '100%' }} spacing={7} alignItems="center">
                <div style={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            p: 1,
                            borderRadius: 1,
                        }}
                    >
                        <Button
                            size='small'
                            style={{
                                backgroundColor: 'black',
                                border: "none",
                                outline: "none"
                            }}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 800,
                                fontSize: 18,
                                px: 2,
                                mx: 2,
                                fontFamily: [
                                    'cursive',
                                ].join(','),
                            }}
                            startIcon={<PersonIcon />}
                        >
                            {listPlayers.length}
                        </Button>
                        <Box sx={{
                            borderRadius: 2,
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            py: 1.5,
                        }}>
                            <Typography
                                sx={{
                                    px: 1,
                                    mx: 1,
                                    width: '18vw',
                                    fontSize: 18,
                                }}
                                variant="h6" align='center' fontWeight='bold'>
                                {isBlockJoin ? 'This game is locked. No one else can join' : 'Join at www.kahut.it or with the Kahut! app'}
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 5, borderColor: '#bf6464', borderRadius: 5 }} />
                            {isBlockJoin ?
                                <Box
                                    sx={{
                                        width: '16vw',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        display: 'flex',
                                        mx: 3,
                                        py: 1.5,
                                        fontSize: 25,
                                        borderRadius: 1,
                                    }}
                                >
                                    <LockIcon fontSize="inherit" />
                                </Box>
                                :
                                <Box>
                                    <Typography
                                        sx={{
                                            px: 1,
                                            mx: 1,
                                        }}
                                        variant="h6" align='left' fontWeight='bold'>
                                        Game pin:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            px: 1,
                                            mx: 1,
                                            fontSize: 50,
                                            fontFamily: 'Roboto'
                                        }}
                                        variant="h6" align='left' fontWeight='bold'>
                                        {pin}
                                    </Typography>
                                </Box>
                            }
                        </Box>
                        <Stack direction='row' spacing={2}>
                            <IconButton
                                onClick={() => dispatch(setBlockJoin())}
                                style={{
                                    backgroundColor: 'white',
                                    border: "none",
                                    outline: "none"
                                }}
                                aria-label="delete" size="large"  >
                                {isBlockJoin ? <LockIcon fontSize="inherit" /> : <LockOpenIcon fontSize="inherit" />}

                            </IconButton>
                            <Button
                                onClick={() => dispatch(startGame())}
                                variant='contained'
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    fontSize: 22,
                                    '&:hover': {
                                        backgroundColor: 'yellow',
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                }}
                            >Start</Button>
                        </Stack>
                    </Box>
                </div>
                <div style={{ width: '100%' }}>
                    <Box sx={{ flexGrow: 1, px: 10 }}>
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            {listPlayers.length === 0 && !isBlockJoin ?
                                <Button
                                    style={{
                                        backgroundColor: 'black',
                                        border: "none",
                                        outline: "none"
                                    }}
                                    sx={{
                                        color: 'white',
                                        textTransform: 'none',
                                        fontWeight: 800,
                                        fontSize: 22,
                                        pl: 2,
                                        pr: 5 - count % 3,
                                        mx: 2,
                                        fontFamily: [
                                            'cursive',
                                        ].join(','),
                                    }}
                                >

                                    Waiting for players
                                    {count % 3 === 0 && ' .'}
                                    {count % 3 === 1 && ' ..'}
                                    {count % 3 === 2 && ' ...'}
                                </Button>
                                :
                                listPlayers.map(eachPlayer => {
                                    return (
                                        <Grid key={eachPlayer.id} item xs="auto">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    borderRadius: 1,
                                                    boxShadow: 5,
                                                    py: 1,
                                                    px: 2,
                                                    fontFamily: [
                                                        'cursive',
                                                    ].join(','),
                                                }}
                                            >
                                                {eachPlayer.name}
                                            </Box>
                                        </Grid>
                                    )
                                })}
                        </Grid>
                    </Box>
                </div>
            </Stack>
        </Box >
    );
};

export default WaitingPlayers;
