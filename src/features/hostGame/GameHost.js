import { Box } from '@mui/material'
import { useEffect, useState } from 'react';

import ChooseAns from './ChooseAns';
import GetReady from './GetReady';
import Idle from './Idle';
import LoadingPin from './LoadingPin';
import ReadQuestion from './ReadQuestion';
import ScoreBoard from './ScoreBoard';
import ShowResult from './ShowResult';
import WaitingPlayers from './WaitingPlayers';
const GameHost = () => {
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState('Idle');

    useEffect(() => {
        const interval = setInterval(() => {
            count === 1 && setStatus("getReady");
            count === 2 && setStatus("readQuestion");
            count === 3 && setStatus("chooseAnswer");
            count === 4 && setStatus("waitResult");
            count === 5 && setStatus("timeUp");
            count === 6 && setStatus("getReady");
            setCount((count) => count + 1);
        }, 5000);
        return () => clearInterval(interval);
    });

    return (
        <Box height="100%" width='100%' sx={{
            backgroundColor: '#1368CE',
        }}
        >

            <ScoreBoard />
        </Box>
    );
};

export default GameHost;
