import { Box, Typography, Stack, Dialog, Button, DialogContent, Slide } from '@mui/material'
import { useState, forwardRef } from 'react';

import { useSelector, useDispatch } from "react-redux";
import {
    gameSelector,
    requestScoreboard
} from './gameSlice';

import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

import { answerUI, answerUI2 } from '../../components/AnswerUI';
import ActionUtils from './ActionUtils';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ShowResult = () => {
    const dispatch = useDispatch();
    const { curRoom, curQuestion, countEachAns, pin } = useSelector(
        gameSelector
    );
    const [isShowMedia, setIsShowMedia] = useState(false);
    const question = curRoom.questions[curQuestion]

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#F2F2F2'
        }}>
            <Box
                sx={{
                    height: 2 / 10,
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
                    <ActionUtils />
                </Box>
                <Box sx={{
                    width: '70%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'center',
                    display: 'flex',
                }}>
                    <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 3 }}>
                        <Typography
                            sx={{
                                color: 'black',
                            }}
                            variant="h5" align='center' fontWeight='bold'>
                            {question.text}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: '15%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'flex-end',
                    display: 'grid',
                }}>
                    <Button
                        onClick={() => dispatch(requestScoreboard())}
                        variant='contained'
                        sx={{ textTransform: 'none' }}>
                        Next
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    height: '45%',
                    px: 2,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }}
            >
                <Stack spacing={2} direction='row' sx={{ height: '100%', alignItems: 'flex-end', py: 2 }}>
                    {countEachAns.map((total, index) => (
                        <Box
                            key={'total' + index}
                            sx={{
                                width: '12vw',
                                height: total / Math.max(...countEachAns) * (92 / 100),
                                minHeight: 30,
                                minWidth: 80,
                                backgroundColor: answerUI2[index].bgColor,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                color: 'white',
                                py: 0.5,
                                borderRadius: 1,
                            }}
                        >
                            <Stack spacing={1} direction='row' sx={{ alignItems: 'center', fontSize: 25 }}>
                                {answerUI2[index].icon}
                                <Typography sx={{ fontWeight: 'bold' }} >
                                    {total}
                                </Typography>
                                {question.ans[index].isRight && <DoneIcon />}
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Box >
            <Box
                sx={{
                    height: '5%',
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    onClick={() => setIsShowMedia(true)}
                    variant='contained'
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 'bold'
                    }}>Show media</Button>
                <Dialog
                    open={isShowMedia}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setIsShowMedia(false)}
                >
                    <DialogContent>
                        <Box sx={{ backgroundColor: '#fff', p: 1, borderRadius: 2, boxShadow: 3 }}>
                            <Box
                                component="img"
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                alt="Sesame seeds"
                                src={question.img}
                            />
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>
            <Box
                sx={{
                    height: '25%',
                    boxShadow: 1,
                    px: 2,
                    py: 1,
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}
            >
                {question.ans.map((eachAns, index) => (
                    <Box
                        key={'ans' + index}
                        sx={{
                            backgroundColor: answerUI[index].bgColor,
                            color: 'white',
                            alignItems: "center",
                            justifyContent: "left",
                            display: 'flex',
                            borderRadius: 1,
                            px: 2,
                            opacity: eachAns.isRight ? 2 : 0.3,
                        }}
                    >
                        <Box sx={{
                            width: '90%',
                            alignItems: "center",
                            justifyContent: "left",
                            display: 'flex',
                        }}>
                            {answerUI[index].icon}
                            <Typography
                                sx={{
                                    pl: 2,
                                    color: 'white',
                                    fontFamily: [
                                        'Chilanka',
                                        'cursive',
                                    ].join(','),
                                }}
                                variant="h5" align='left' fontWeight='bold'>
                                {eachAns.text}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', width: 'auto', justifyContent: 'flex-end' }}>
                            {eachAns.isRight ? <DoneIcon fontSize='large' /> : <ClearIcon fontSize='large' />}
                        </Box>
                    </Box>
                ))}

            </Box>
            <Box
                sx={{
                    height: '5%',
                    boxShadow: 5,
                    px: 2,
                    display: 'flex',
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
                    {curQuestion + 1} / {curRoom.questions.length}
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

export default ShowResult;
