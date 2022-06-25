import { Box } from '@mui/material'
import ChooseAns from './ChooseAns';
import GetReady from './GetReady';
import Idle from './Idle';
import LoadingPin from './LoadingPin';
import ReadQuestion from './ReadQuestion';
import WaitingPlayers from './WaitingPlayers';
const GameHost = () => {
    return (
        <Box height="100%" width='100%' sx={{
            backgroundColor: '#1368CE',
        }}
        >
            <ChooseAns />
        </Box>
    );
};

export default GameHost;
