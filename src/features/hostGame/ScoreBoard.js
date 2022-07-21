import { Box, Typography, Stack, Button, } from '@mui/material'
import socket from '../../utils/socket';

import { useSelector } from "react-redux";
import {
    gameSelector,
} from './gameSlice';
import ActionUtils from './ActionUtils';


const ScoreBoard = () => {
    const { pin, scoreBoard, curQuestion, curRoom } = useSelector(
        gameSelector
    );

    const totalQuestion = curRoom.questions.length
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
        }}>
            <Box
                sx={{
                    height: 4 / 10,
                    p: 2,
                    display: 'flex',
                }}
            >
                <Box sx={{
                    width: '15%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'left',
                    display: 'flex',
                }}>
                    <ActionUtils sx={{ color: 'white' }} />
                </Box>
                <Box sx={{
                    width: '70%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'center',
                    display: 'flex',
                }}>
                    <Box sx={{ p: 2 }}>
                        <Stack spacing={0} alignItems="center">
                            <Typography
                                sx={{
                                    color: 'black',
                                    backgroundColor: 'white',
                                    borderRadius: 2,
                                    py: 1,
                                    px: 2,
                                    mb: 1,
                                }}
                                variant="h3" align='center' fontWeight='bold'>
                                Scoreboard
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: 22,
                                    fontFamily: [
                                        'Chilanka',
                                        'cursive',
                                    ].join(','),
                                }}
                                align='center' fontWeight='bold'>
                                Kahut!
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'white',
                                }}
                                align='center' fontWeight='bold'>
                                Basic edition!
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
                <Box sx={{
                    width: '15%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'flex-end',
                    display: 'flex',
                }}>
                    <Button
                        onClick={() => socket.emit('NEXT_QUESTION')}
                        variant="contained"
                        sx={{
                            color: 'black',
                            display: 'block',
                            backgroundColor: 'white',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: 18,
                            '&:hover': {
                                fontWeight: 'bold',
                                backgroundColor: 'yellow',
                                color: 'black',
                            }
                        }}
                    > Next</Button>
                </Box>
            </Box>
            <Box
                sx={{
                    height: '55%',
                    px: 2,
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                }}
            >
                <Stack spacing={2} sx={{ height: '100%', width: '60%', alignItems: 'center', py: 2 }}>
                    {scoreBoard.length === 0
                        ?
                        <Typography width='90%' sx={{
                            fontSize: 25,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: 'white',
                            py: 1,
                            borderRadius: 2,
                        }}>Every one have been 0 points</Typography>
                        :
                        scoreBoard.map((eachResult, index) => (
                            <Stack
                                key={'reuslt' + index}
                                direction='row'
                                sx={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    py: 1,
                                    px: 3,
                                    borderRadius: 1,
                                }}
                            >
                                <Typography width='90%' sx={{ fontSize: 25, textAlign: 'left', fontWeight: 'bold' }}>{eachResult.name}</Typography>
                                <Typography width='10%' sx={{ fontSize: 25, textAlign: 'right' }}>{eachResult.score}</Typography>
                            </Stack>
                        ))
                    }
                </Stack>
            </Box >
            <Box
                sx={{
                    height: '5%',
                    boxShadow: 5,
                    px: 2,
                    display: 'flex',
                    backgroundColor: '#F2F2F2'
                }}
            >
                <Typography variant='h6' sx={{
                    fontWeight: 'bold',
                    width: '30%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'left',
                    display: 'flex',
                }}>
                    {curQuestion + 1} / {totalQuestion}
                </Typography>
                <Typography sx={{
                    marginLeft: 1,
                    fontWeight: 'bold',
                    width: '70%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    display: 'flex',
                }}>
                    kahut.it Game PIN: {pin}
                </Typography>
            </Box>
        </Box >
    );
};

export default ScoreBoard;
