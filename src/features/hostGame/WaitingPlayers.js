import { Box, Typography, Stack, IconButton, Zoom, Button, Divider } from '@mui/material'
import { useState, useEffect } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import styled from '@emotion/styled';

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

const useStyles = styled((theme) => ({
    buttonRoot: {
        fontSize: 'inherit', /* inherit from Typography */
    },
    myIconSizeMedium: {
        "& > *:first-child": {
            fontSize: 25,
        }
    }
}));

const WaitingPlayers = () => {
    const [isLock, setIsLock] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);
        return () => clearInterval(interval);
    });

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack style={{ width: '100%' }} spacing={7} alignItems="center">
                <div style={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            p: 1,
                            borderRadius: 1,
                        }}
                    >
                        <Button
                            size='small'
                            style={{
                                backgroundColor: 'black',
                                border: "none",
                                outline: "none"
                            }}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 800,
                                fontSize: 18,
                                px: 2,
                                mx: 2,
                                fontFamily: [
                                    'cursive',
                                ].join(','),
                            }}
                            startIcon={<PersonIcon />}
                        >
                            0
                        </Button>
                        <Box sx={{
                            borderRadius: 2,
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Typography
                                sx={{
                                    px: 1,
                                    mx: 1,
                                    width: '18vw',
                                    fontSize: 18,
                                }}
                                variant="h6" align='center' fontWeight='bold'>
                                Join at www.kahut.it or with the Kahut! app
                            </Typography>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box>
                                <Typography
                                    sx={{
                                        px: 1,
                                        mx: 1,
                                    }}
                                    variant="h6" align='left' fontWeight='bold'>
                                    Game pin:
                                </Typography>
                                <Typography
                                    sx={{
                                        px: 1,
                                        mx: 1,
                                        fontSize: 50,
                                        fontFamily: 'Roboto'
                                    }}
                                    variant="h6" align='left' fontWeight='bold'>
                                    22378
                                </Typography>
                            </Box>
                        </Box>
                        <Stack direction='row' spacing={2}>
                            <IconButton
                                onClick={() => setIsLock(!isLock)}
                                style={{
                                    backgroundColor: 'white',
                                    border: "none",
                                    outline: "none"
                                }}
                                aria-label="delete" size="large"  >
                                {isLock ? <LockIcon fontSize="inherit" /> : <LockOpenIcon fontSize="inherit" />}

                            </IconButton>
                            <Button variant='contained'
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    fontSize: 22,
                                    '&:hover': {
                                        backgroundColor: 'yellow',
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                }}
                            >Start</Button>
                        </Stack>
                    </Box>
                </div>
                <Stack spacing={7} alignItems="center">
                    <Button
                        style={{
                            backgroundColor: 'black',
                            border: "none",
                            outline: "none"
                        }}
                        sx={{
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 800,
                            fontSize: 22,
                            pl: 1,
                            pr: 4 - count % 3,
                            mx: 2,
                            fontFamily: [
                                'cursive',
                            ].join(','),
                        }}
                    >
                        Waiting for players
                        {count % 3 === 0 && ' .'}
                        {count % 3 === 1 && ' ..'}
                        {count % 3 === 2 && ' ...'}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default WaitingPlayers;
