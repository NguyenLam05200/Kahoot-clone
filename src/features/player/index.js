import { Box } from '@mui/material'
import { useEffect, useState } from 'react';
import Socket from '../../utils/socket';

import { useSelector, useDispatch } from "react-redux";
import {
    playerSelector,
    sendPinResult,
    ready,
    readQuestion,
    incorrectAns,
    correctAns,
    timeUp,
    reset,
    sumaryData,
    sumary,
    prepareSumary
} from './playerSlice';

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
        }, 500);
    };

    const startGame = () => {
        dispatch(ready())
    };

    useEffect(() => {
        Socket.emit('HAND_SHAKE')
        Socket.on('ENTER_PIN', handlePinResult)
        Socket.on('START_GAME', startGame)
        Socket.on('READ_QUESTION', (msg) => dispatch(readQuestion(msg)))
        Socket.on('CORRECT', (msg) => dispatch(correctAns(msg)))
        Socket.on('INCORRECT', () => dispatch(incorrectAns()))
        Socket.on('SKIP', () => dispatch(timeUp()))
        Socket.on('HOST_LEAVE', () => dispatch(reset()))
        Socket.on('PREPARE_SUMARY', () => dispatch(prepareSumary()))
        Socket.on('SUMARY_DATA', (msg) => dispatch(sumaryData(msg)))
        Socket.on('SUMARY', () => dispatch(sumary()))

        return () => {
            Socket.off('ENTER_PIN', handlePinResult);
            Socket.off('START_GAME', startGame)
        };
    }, []);

    return (
        <Box height="100vh"  >
            {status !== 'idle' && status !== 'rightPin' ? <Game /> : <Join />}
        </Box >
    );
};
