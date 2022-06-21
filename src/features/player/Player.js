import { Box } from '@mui/material'
import Join from './Join';
import Game from './Game';
import { useSelector } from "react-redux";
import { playerSelector } from './playerSlice';

export const PlayerPage = () => {
    const { status } = useSelector(
        playerSelector
    );
    return (
        <Box height="100vh"  >
            {status !== 'idle' && status !== 'rightPin' ? <Game /> : <Join />}
        </Box >
    );
};
