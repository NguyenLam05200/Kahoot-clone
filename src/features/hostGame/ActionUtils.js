import { Box, Typography, Stack, IconButton, LinearProgress, Button } from '@mui/material'


import { useSelector, useDispatch } from "react-redux";
import {
    gameSelector,
    setFullScreen,
    setVolume
} from './gameSlice';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeOff from '@mui/icons-material/VolumeOff';
import { useState } from 'react';


const ActionUtils = (props) => {
    const dispatch = useDispatch();
    const { isFullScreen, volume } = useSelector(
        gameSelector
    );
    const [open, setOpen] = useState(false);

    const handleChange = (event, newValue) => {
        dispatch(setVolume(newValue / 100))
    };

    return (
        <Stack sx={{ width: '100%', display: 'block' }} spacing={2}>
            <IconButton
                style={{
                    fontWeight: 'bold',
                    // border: "none",
                    // outline: "none"
                }}
                aria-label="delete"
                size="medium"
                sx={{
                    // width: 20,
                    boxShadow: 2,
                    backgroundColor: 'white',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'pink',
                    }
                }}
                onClick={() => dispatch(setFullScreen())}
            >
                {isFullScreen ? <FullscreenExitIcon fontSize="inherit" /> : < FullscreenIcon fontSize="inherit" />}
            </IconButton>

            {open ?
                <Box sx={{ width: '100%' }}>
                    <IconButton
                        onClick={() => setOpen(!open)}
                        style={{
                            fontWeight: 'bold',
                            border: "none",
                            outline: "none"
                        }}
                        aria-label="delete"
                        size="medium"
                        sx={{
                            boxShadow: 3,
                            backgroundColor: 'white',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'purple',
                                color: 'white',
                            }
                        }}
                    >
                        {volume === 0 && < VolumeOff fontSize="inherit" />}
                        {volume > 0 && volume < 0.5 && < VolumeDown fontSize="inherit" />}
                        {volume >= 0.5 && < VolumeUp fontSize="inherit" />}
                    </IconButton>
                </Box>
                :
                <Stack spacing={2} direction="row" alignItems="center">
                    <IconButton
                        onClick={() => setOpen(!open)}
                        style={{
                            fontWeight: 'bold',
                            border: "none",
                            outline: "none"
                        }}
                        aria-label="delete"
                        size="medium"
                        sx={{
                            boxShadow: 3,
                            backgroundColor: 'white',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'purple',
                                color: 'white',
                            }
                        }}
                    >
                        {volume === 0 && < VolumeOff fontSize="inherit" />}
                        {volume > 0 && volume < 0.5 && < VolumeDown fontSize="inherit" />}
                        {volume >= 0.5 && < VolumeUp fontSize="inherit" />}
                    </IconButton>
                    <Slider
                        {...props}
                        open={!open}
                        aria-label="Volume" value={volume * 100} onChange={handleChange} />
                </Stack>
            }

        </Stack>
    )
}

export default ActionUtils