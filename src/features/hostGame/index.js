import { Box } from '@mui/material'
import { useEffect, useCallback, useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { gameSelector, setStateLoadingPin, getPinSuccess, joinPlayer, leavePlayer } from './gameSlice';
import socket from '../../utils/socket';

import ChooseAns from './ChooseAns';
import GetReady from './GetReady';
import Idle from './Idle';
import LoadingPin from './LoadingPin';
import ReadQuestion from './ReadQuestion';
import ScoreBoard from './ScoreBoard';
import ShowResult from './ShowResult';
import WaitingPlayers from './WaitingPlayers';

const GameHost = () => {
    const { status, listQuestions, isBlockJoin } = useSelector(
        gameSelector
    );
    const dispatch = useDispatch();


    const requestCreatePin = (message) => {
        window.setTimeout(function () {
            dispatch(setStateLoadingPin())
            socket.emit("CREATE_PIN", listQuestions);
        }, 1000);
    };
    const setPin = (newPin) => {
        window.setTimeout(function () {
            dispatch(getPinSuccess(newPin))
            socket.emit('TEST');
        }, 1000);
    };
    const playerJoin = (msg) => {
        dispatch(joinPlayer(msg))
    };
    const playerLeave = (id) => {
        dispatch(leavePlayer(id))
    };

    useEffect(() => {
        socket.emit('HAND_SHAKE');
        socket.on('HAND_SHAKE', requestCreatePin);
        socket.on('CREATE_PIN', setPin);
        socket.on('PLAYER_JOIN', playerJoin);
        socket.on('PLAYER_LEAVE', playerLeave);

        return () => {
            socket.off('HAND_SHAKE', requestCreatePin);
            socket.off('CREATE_PIN', setPin);
            socket.off('PLAYER_JOIN', playerJoin);
            socket.off('PLAYER_LEAVE', playerLeave);
        };
    }, []);

    return (
        <Box height="100%" width='100%' sx={{
            backgroundColor: '#1368CE',
        }}
        >
            {status === 'idle' && <Idle />}
            {status === 'loadingPin' && <LoadingPin />}
            {status === 'waitPlayers' && <WaitingPlayers />}
        </Box>
    );
};

export default GameHost;
