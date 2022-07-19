import { Box } from '@mui/material'
import { useEffect, useCallback, useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import {
    getRoomByID,
    gameSelector,
    setStateLoadingPin,
    getPinSuccess,
    joinPlayer,
    leavePlayer,
    readQuestion,
    sendAnswer,
    getScoreBoard,
    prepareSumary,
    addNewReport
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
import Sumary from './Sumary';
import PrepareSumary from './PrepareSumary';
import Report from './Report';

import { Navigate, useParams } from "react-router-dom";
import { parseJwt } from '../../utils/axios';

const GameHost = () => {
    const { status, curRoom } = useSelector(
        gameSelector
    );
    const dispatch = useDispatch();


    const getPinOnEmit = (newPin) => {
        window.setTimeout(function () {
            dispatch(getPinSuccess(newPin))
        }, 3000);
    };

    const roomID = useParams().roomID

    const getReportOnEmit = (reportDataAnalyst) => {
        dispatch(prepareSumary(reportDataAnalyst))
        const newReport = {
            quizID: roomID,
            percentRightTotal: reportDataAnalyst.percentRightTotal,
            players: reportDataAnalyst.players,
            timeStart: reportDataAnalyst.timeStart,
            timeEnd: reportDataAnalyst.timeEnd,
            analysisResults: reportDataAnalyst.reportData,
            listCountChooseAns: reportDataAnalyst.listCountChooseAns,
        }
        dispatch(addNewReport(newReport))
    }

    useEffect(() => {
        window.setTimeout(function () {
            dispatch(getRoomByID(roomID))
        }, 3000);

        socket.emit('HAND_SHAKE');
        // socket.on('HAND_SHAKE', requestCreatePin);

        socket.on('CREATE_PIN', (newPin) => getPinOnEmit(newPin));
        socket.on('PLAYER_JOIN', (msg) => dispatch(joinPlayer(msg)));
        socket.on('PLAYER_LEAVE', (id) => dispatch(leavePlayer(id)));
        socket.on('READ_QUESTION', (msg) => dispatch(readQuestion(msg)))
        socket.on('SEND_ANSWER', (ans) => dispatch(sendAnswer(ans)))
        socket.on('SCORE_BOARD', (listScoreBoard) => dispatch(getScoreBoard(listScoreBoard)))
        socket.on('PREPARE_SUMARY', (reportDataAnalyst) => getReportOnEmit(reportDataAnalyst))

        return () => {
            socket.off('CREATE_PIN', getPinOnEmit);
            socket.off('PREPARE_SUMARY', getReportOnEmit)
        };
    }, []);

    const token = localStorage.kahut_app_accessToken
    if (token) {
        const tokenParse = parseJwt(token);
        if (tokenParse.exp * 1000 < Date.now()) {
            delete localStorage.kahut_app_accessToken;
            return <Navigate to="/login" />;
        }
    } else {
        return <Navigate to="/login" />;
    }

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
            {status === 'scoreBoard' && <ScoreBoard />}
            {status === 'prepareSumary' && <PrepareSumary />}
            {status === 'sumary' && <Sumary />}
            {status === 'report' && <Report />}
        </Box>
    );
};

export default GameHost;
