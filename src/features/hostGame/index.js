import { Box } from '@mui/material'
import { useEffect, useCallback, useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import {
    gameSelector,
    setStateLoadingPin,
    getPinSuccess,
    joinPlayer,
    leavePlayer,
    readQuestion,
    sendAnswer
} from './gameSlice';
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
    const { status, listQuestions } = useSelector(
        gameSelector
    );
    const dispatch = useDispatch();


    const requestCreatePin = () => {
        window.setTimeout(function () {
            dispatch(setStateLoadingPin())
            socket.emit("CREATE_PIN", listQuestions);
        }, 50);
    };

    useEffect(() => {
        socket.emit('HAND_SHAKE');
        socket.on('HAND_SHAKE', requestCreatePin);
        socket.on('CREATE_PIN', (newPin) => dispatch(getPinSuccess(newPin)));
        socket.on('PLAYER_JOIN', (msg) => dispatch(joinPlayer(msg)));
        socket.on('PLAYER_LEAVE', (id) => dispatch(leavePlayer(id)));
        socket.on('READ_QUESTION', (msg) => dispatch(readQuestion(msg)))
        socket.on('SEND_ANSWER', (ans) => dispatch(sendAnswer(ans)))

        return () => {
            socket.off('HAND_SHAKE', requestCreatePin);
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
            {status === 'startGame' && <GetReady />}
            {status === 'readQuestion' && <ReadQuestion />}
            {status === 'chooseAnswer' && <ChooseAns />}
            {status === 'showResult' && <ShowResult />}
        </Box>
    );
};

export default GameHost;
