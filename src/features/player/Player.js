import { TextField, Box, Stack, Grid, Paper, Divider, Typography, Container, Button } from '@mui/material'
import { purple } from '@mui/material/colors';
import { useState } from 'react'
import Join from './Join';
import Game from './Game';

export const PlayerPage = () => {
    const [isJoin, setIsJoin] = useState(false);

    return (
        <Box height="100vh"  >
            {isJoin ? <Game /> : <Join />}
        </Box >
    );
};
