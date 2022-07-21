import { Box } from '@mui/material'
import { useEffect } from 'react';
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
    prepareSumary,
    skip,
    playAgain
} from './playerSlice';

import Join from './Join';
import Game from './Game';

export const PlayerPage = () => {
    const { status } = useSelector(
        playerSelector
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const handlePinResult = (message) => {
            window.setTimeout(function () {
                dispatch(sendPinResult(message))
            }, 500);
        };

        const startGame = () => {
            dispatch(ready())
        };

        Socket.emit('HAND_SHAKE')
        Socket.on('ENTER_PIN', handlePinResult)
        Socket.on('START_GAME', startGame)
        Socket.on('READ_QUESTION', (msg) => dispatch(readQuestion(msg)))
        Socket.on('CORRECT', (msg) => dispatch(correctAns(msg)))
        Socket.on('INCORRECT', () => dispatch(incorrectAns()))
        Socket.on('SKIP', () => dispatch(skip()))
        Socket.on('TIME_UP', () => dispatch(timeUp()))
        Socket.on('HOST_LEAVE', () => dispatch(reset()))
        Socket.on('PREPARE_SUMARY', () => dispatch(prepareSumary()))
        Socket.on('SUMARY_DATA', (msg) => dispatch(sumaryData(msg)))
        Socket.on('SUMARY', () => dispatch(sumary()))
        Socket.on('PLAY_AGAIN', () => dispatch(playAgain()))

        return () => {
            Socket.off('ENTER_PIN', handlePinResult);
            Socket.off('START_GAME', startGame)
        };
    }, [dispatch]);

    return (
        <Box height="100vh"  >
            {status !== 'idle' && status !== 'rightPin' ? <Game /> : <Join />}
        </Box >
    );
};
