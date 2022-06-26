import { Box } from '@mui/material'
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { playerSelector, setSocket } from './playerSlice';

import Join from './Join';
import Game from './Game';

export const PlayerPage = () => {
    const { status } = useSelector(
        playerSelector
    );

    const dispatch = useDispatch();
    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:3000`);
        dispatch(setSocket(newSocket));
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <Box height="100vh"  >
            {status !== 'idle' && status !== 'rightPin' ? <Game /> : <Join />}
        </Box >
    );
};
