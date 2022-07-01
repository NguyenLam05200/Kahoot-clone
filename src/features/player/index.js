import { Box } from '@mui/material'
import { useEffect, useState } from 'react';
import Socket from '../../utils/socket';

import { useSelector, useDispatch } from "react-redux";
import { playerSelector, sendPinResult } from './playerSlice';

import Join from './Join';
import Game from './Game';

export const PlayerPage = () => {
    const { status } = useSelector(
        playerSelector
    );

    const dispatch = useDispatch();

    const handlePinResult = (message) => {
        window.setTimeout(function () {
            dispatch(sendPinResult(message))
        }, 1000);
    };

    useEffect(() => {
        Socket.emit('HAND_SHAKE')
        Socket.on('ENTER_PIN', handlePinResult)
        return () => {
            Socket.off('ENTER_PIN', handlePinResult);
        };
    }, []);

    return (
        <Box height="100vh"  >
            {status !== 'idle' && status !== 'rightPin' ? <Game /> : <Join />}
        </Box >
    );
};
