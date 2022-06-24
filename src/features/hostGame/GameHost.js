import { Box } from '@mui/material'
import Idle from './Idle';
import LoadingPin from './LoadingPin';

const GameHost = () => {
    return (
        <Box height="100vh" sx={{
            backgroundColor: 'primary.dark',
        }}
        >
            <LoadingPin />
        </Box >
    );
};

export default GameHost;
