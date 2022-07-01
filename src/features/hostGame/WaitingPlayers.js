import { useState, useEffect } from 'react';

import { gameSelector, setBlockJoin, startGame } from './gameSlice';
import { useSelector, useDispatch } from "react-redux";

import { Box, Typography, Stack, IconButton, Zoom, Button, Divider } from '@mui/material'
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
                            alignItems: 'center'
                        }}>
                            <Typography
                                sx={{
                                    px: 1,
                                    mx: 1,
                                    width: '18vw',
                                    fontSize: 18,
                                }}
                                variant="h6" align='center' fontWeight='bold'>
                                Join at www.kahut.it or with the Kahut! app
                            </Typography>
                            <Divider orientation="vertical" variant="middle" flexItem />
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
                <Stack spacing={7} alignItems="center" direction='row'>
                    {listPlayers.length === 0 ?
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
                                pl: 1,
                                pr: 4 - count % 3,
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
                                <Button
                                    key={eachPlayer.id}
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
                                        pl: 1,
                                        mx: 2,
                                        fontFamily: [
                                            'cursive',
                                        ].join(','),
                                    }}
                                >
                                    {eachPlayer.name}
                                </Button>
                            )
                        })

                    }
                </Stack>
            </Stack>
        </Box>
    );
};

export default WaitingPlayers;
