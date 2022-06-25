import { Box } from '@mui/material'
import Idle from './Idle';
import LoadingPin from './LoadingPin';
import WaitingPlayers from './WaitingPlayers';
const GameHost = () => {
    return (
        <Box height="100vh" sx={{
            backgroundColor: 'primary.dark',
        }}
        >
            <WaitingPlayers />
        </Box >
    );
};

export default GameHost;
