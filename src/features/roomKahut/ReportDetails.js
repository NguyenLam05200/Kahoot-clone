import {
    Box, Stack, Grid, Button, Typography, Divider,
    ListItem,
    ListItemAvatar,
    Avatar,
    List,
    Collapse,
    CircularProgress,
    Skeleton
} from '@mui/material'
import {
    useState
} from 'react';
import { styled } from '@mui/material/styles';

import SortIcon from '@mui/icons-material/Sort';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { useNavigate, } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
    setInitCurRoom,
    getReportByID,
    getRoomByID,
    setInitCurReport,
    roomSelector,
    clearState,
} from './roomSlice';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { answerUI2 } from '../../components/AnswerUI';
import * as React from 'react'
import {
    optionsQuestionType,
} from '../../utils/utilities'

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import HelpIcon from '@mui/icons-material/Help';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'black',
        color: 'white',
        boxShadow: theme.shadows[5],
        fontSize: 14,
        mx: 1,
    },
}));

function CircularProgressWithLabel(props) {
    const size = '6em';
    const thick = 5;
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                thickness={thick}
                size={size}
                variant="determinate"
                {...props}
                style={{
                    position: 'relative',
                    zIndex: 2,
                }}
            />
            <CircularProgress
                variant="determinate"
                value={100}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    right: 0
                }}
                sx={{ color: '#f2f2f2' }}
                thickness={thick}
                size={size}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stack textAlign='center' sx={{ color: 'black' }}>
                    <Typography component="div" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                        {`${Math.round(props.value)}%`}
                    </Typography>
                    <Typography component="div" sx={{ fontSize: 15, }}>
                        correct
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}


function CircularProgressListItem(props) {
    const size = props.size;
    const thick = 8;
    const colorUnder = props.value > 100 ? '#afbad0' : '#f2f2f2';
    const colorFront = '#66BF39'
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                thickness={thick}
                size={size}
                variant="determinate"
                value={props.value > 100 ? 0 : props.value}
                style={{
                    position: 'relative',
                    zIndex: 6,
                }}
                sx={{ color: colorFront }}
            />
            <CircularProgress
                variant="determinate"
                value={100}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    right: 0
                }}
                sx={{ color: colorUnder }}
                thickness={thick}
                size={size}
            />
        </Box>
    );
}


function NestedList(props) {
    const { curRoom, curReport } = useSelector(
        roomSelector
    );
    const reportDataAnalyst = curReport.analysisResults;
    const listCountChooseAns = curReport.listCountChooseAns;

    const [open, setOpen] = useState(new Array(reportDataAnalyst.length).fill(false));

    useEffect(() => {
        setOpen(new Array(reportDataAnalyst.length).fill(props.isShowAll))
    }, [props.isShowAll, reportDataAnalyst])
    // setOpen()
    const handleClick = (event, index) => {
        open[index] = !open[index]
        setOpen([...open]);
    };
    return (
        <List
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'auto',
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {reportDataAnalyst.map((eachReport, index) => {
                return (
                    <Box key={index} sx={{ boxShadow: 5, backgroundColor: 'white' }}>
                        {
                            curRoom ?
                                <React.Fragment>
                                    <ListItem
                                        alignItems='flex-start'
                                        key={index}
                                        sx={{
                                            height: 135,
                                            my: 2,
                                            bgcolor: 'white',
                                            borderRadius: 0.5,
                                            p: 0.3,
                                        }}
                                    >
                                        <ListItemAvatar sx={{ p: 0, m: 0, width: 200, height: '100%', flex: '1 1 auto' }}>
                                            <Avatar sx={{ width: '100%', height: '100%', borderRadius: 0.5 }} alt="Image alt" src={curRoom.questions[eachReport[0]].img} variant="square" />
                                        </ListItemAvatar>
                                        <Box sx={{ py: 1, pl: 1, width: '100%', height: '100%' }}>
                                            <Stack sx={{ height: 'calc(100% - 40px)' }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: 13,
                                                        color: 'grey',
                                                    }}>
                                                    {eachReport[0] + 1 + ' -  ' + optionsQuestionType[curRoom.questions[eachReport[0]].type].text}
                                                </Typography>
                                                <Typography
                                                    sx={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}
                                                    component="span"
                                                >
                                                    {curRoom.questions[eachReport[0]].text}
                                                </Typography>
                                            </Stack>
                                            <Box
                                                sx={{
                                                    width: ' 100%',
                                                    height: 40,
                                                    display: 'flex'
                                                }}
                                            >
                                                <Stack
                                                    textAlign='center'
                                                    direction='row'
                                                    spacing={1}
                                                    sx={{
                                                        width: '50%',
                                                        height: '100%',
                                                    }}
                                                >
                                                    <CircularProgressListItem value={eachReport[1]} size={40} />
                                                    <Typography sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        fontSize: 15,
                                                    }}>
                                                        {eachReport[1] > 100 ? 'Skiped' : eachReport[1] + '% correct'}
                                                    </Typography>
                                                </Stack>
                                                <Stack
                                                    textAlign='center'
                                                    direction='row-reverse'
                                                    spacing={1}
                                                    sx={{
                                                        width: '50%',
                                                        height: '100%',
                                                    }}
                                                >
                                                    <Typography
                                                        onClick={(event) => handleClick(event, index)}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontSize: 15,
                                                            cursor: 'pointer'
                                                        }}>
                                                        Show answers
                                                        {open[index] ? <ExpandLess /> : < ExpandMore />}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Box>
                                    </ListItem>
                                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding >
                                            {curRoom.questions[eachReport[0]].ans.map((eachAns, i) => (
                                                <Stack
                                                    key={'ans ' + i}
                                                    direction='row'
                                                    spacing={1}
                                                    alignItems='center'
                                                    sx={{
                                                        my: 0.5,
                                                        py: 1,
                                                        px: 1,
                                                        borderRadius: 1,
                                                        backgroundColor: answerUI2[i].bgColor,
                                                        boxShadow: 2,
                                                        width: '100%',
                                                        color: 'white'
                                                    }}
                                                >
                                                    {answerUI2[i].icon}
                                                    <Typography sx={{ flexGrow: 1, px: 1, fontSize: 18 }}>{eachAns.text}</Typography>
                                                    <LightTooltip title="Total players choose this answer" placement="top" >
                                                        <Box sx={{
                                                            backgroundColor: 'white',
                                                            borderRadius: 1,
                                                            width: '30px',
                                                            height: '30px',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            color: 'black',
                                                            fontWeight: 'bold'
                                                        }}>
                                                            {listCountChooseAns[eachReport[0]][i]}
                                                        </Box>
                                                    </LightTooltip>
                                                    <Box sx={{
                                                        backgroundColor: 'white',
                                                        borderRadius: 1,
                                                        width: '30px',
                                                        height: '30px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        {eachAns.isRight ?
                                                            <DoneIcon sx={{ fontSize: 28, color: 'green', stroke: 'green' }} /> :
                                                            <CloseIcon sx={{ fontSize: 28, color: 'red', stroke: 'red' }} />}
                                                    </Box>
                                                </Stack>
                                            ))}
                                        </List>
                                    </Collapse>
                                </React.Fragment>
                                :
                                <ListItem
                                    alignItems='flex-start'
                                    key={index}
                                    sx={{
                                        height: 120,
                                        my: 2,
                                        bgcolor: 'white',
                                        borderRadius: 0.5,
                                        p: 0.3,
                                    }}
                                >
                                    <Skeleton variant="rectangular" sx={{ p: 0, m: 0, width: 170, height: '100%', }} />
                                    <Box sx={{ py: 1, pl: 1, width: '100%', height: '100%' }}>
                                        <Skeleton variant="text" sx={{ height: 'calc(100% - 40px)' }} />
                                        <Skeleton variant="rectangular"
                                            sx={{
                                                width: ' 100%',
                                                height: 40,
                                            }}
                                        />
                                    </Box>
                                </ListItem>
                        }
                    </Box>
                )
            })}
        </List>
    );
}

const ReportDetails = () => {
    const { listReport, curReport, listRoom, curRoom, isError, isSuccess } = useSelector(
        roomSelector
    );

    const reportID = useParams().reportID

    const [isShowAll, setIsShowAll] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {


        let isHaveReport = false;

        // listReport.map((eachReport, index) => {
        //     if (eachReport._id === reportID) {
        //         isHaveReport = true;
        //         dispatch(setInitCurReport(index))
        //     }
        // }) 
        // use map || every: warning missing return value
        for (const [index, eachReport] of listReport.entries()) {
            if (eachReport._id === reportID) {
                isHaveReport = true;
                dispatch(setInitCurReport(index))
            }
        }


        if (!isHaveReport) {
            dispatch(getReportByID(reportID))
        }

        return () => {
            dispatch(clearState());
        };
    }, [dispatch, listReport, reportID])

    useEffect(() => {
        if (curReport && !curRoom) {
            let isHaveRoom = false;

            // listRoom.map((eachRoom, index) => {
            //     if (eachRoom._id === curReport.quizID) {
            //         isHaveRoom = true;
            //         dispatch(setInitCurRoom(index))
            //     }
            // })
            for (const [index, eachRoom] of listRoom.entries()) {
                if (eachRoom._id === curReport.quizID) {
                    isHaveRoom = true;
                    dispatch(setInitCurRoom(index))
                }
            }

            if (!isHaveRoom) {
                dispatch(getRoomByID(curReport.quizID))
            }
        }
    }, [curReport, curRoom, dispatch, listRoom])


    const navigate = useNavigate();
    useEffect(() => {
        if (isError) {
            dispatch(clearState());
            navigate('/user/reports');
        }

        if (isSuccess) {
            dispatch(clearState());
        }
    }, [isError, isSuccess, dispatch, navigate]);

    return (
        <Grid container minHeight='calc(100% - 74px)' style={{ backgroundColor: '#f2f2f2' }} sx={{ mt: 0.5 }}>
            {curReport &&
                <React.Fragment>
                    <Grid item xs={6} sx={{ boxShadow: 5, p: 2, pl: 3, }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '7.5em',
                                boxShadow: 4,
                                borderRadius: 1,
                                mb: 2,
                                pl: 1,
                                backgroundColor: '#fff',
                                display: 'flex'

                            }}>
                            <Box
                                sx={{
                                    height: '100%',
                                    width: '6em',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgressWithLabel
                                    value={curReport.percentRightTotal}
                                    sx={{
                                        color: "#66BF39",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    height: '100%',
                                    width: 'calc(100% - 6em)',
                                    pr: 1,
                                    pl: 2,
                                }}
                            >
                                {curRoom ?
                                    <Typography
                                        sx={{
                                            fontSize: 25,
                                            color: 'black',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {curRoom.quizTitle}
                                    </Typography>
                                    :
                                    <Skeleton variant='text' />
                                }
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        color: '#000000a1',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Practice makes perfect!
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        sx={{ width: 'calc(100% - 5rem)', color: 'black', fontSize: 15, pr: 2 }}
                                    >
                                        Let players improve results by competing against these scores
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: '5rem',
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <Button
                                            // onClick={() => dispatch(playAgain())}
                                            component={Link}
                                            to={curRoom ? `/user/gameHost/${curRoom._id}` : '#'}
                                            target='_blank'
                                            variant='contained' size='small' sx={{
                                                textTransform: 'none', py: 0.5, px: 1,
                                                '&:hover': {
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                }

                                            }} disableElevation>Play again</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                width: '100%',
                                height: 'calc(100% - 7.5em - 16px )',
                                maxHeight: 'calc(100% - 7.5em - 16px )',
                                boxShadow: 4,
                                borderRadius: 1,
                                p: 1,
                                backgroundColor: '#afbad0'
                            }}>
                            <Box
                                sx={{
                                    height: '2rem',
                                    display: 'flex',
                                    width: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '70%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography sx={{ color: '#352643', fontSize: 18, fontWeight: 'bold' }}>
                                        Analysis difficult questions
                                    </Typography>
                                    <Typography sx={{
                                        color: 'white',
                                        backgroundColor: 'black',
                                        borderRadius: 1,
                                        textAlign: 'center',
                                        px: 1,
                                        m: 2, fontWeight: 'bold', fontSize: 18
                                    }}>
                                        {curReport.analysisResults.length}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: '30%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Button
                                        onClick={() => setIsShowAll(!isShowAll)}
                                        variant='contained'
                                        color="warning"
                                        size='small'
                                        style={{
                                            outline: 'none'
                                        }}
                                        sx={{
                                            fontSize: 15,
                                            textTransform: 'none',
                                            color: 'white',
                                            '&:hover': {
                                                color: 'white',
                                            }
                                        }}
                                    >
                                        {isShowAll ? 'Hide all answers' : 'Show all answers'}
                                    </Button>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    height: 'calc(100% - 2rem)',
                                    width: '100%',
                                }}
                            >
                                <NestedList isShowAll={isShowAll} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ boxShadow: 5, pt: 2, pr: 3, pl: 2 }} >
                        <Box
                            sx={{
                                width: '100%',
                                height: '7.5em',
                                mb: 2,
                                display: 'flex'

                            }}>
                            <Box
                                sx={{
                                    width: '50%',
                                    height: '100%',
                                    boxShadow: 4,
                                    borderRadius: 1,
                                    mr: 1,
                                    px: 1,
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <List component="nav" aria-label="mailbox folders" sx={{ width: '100%' }}>
                                    <ListItem button divider sx={{ p: 0.3 }}>
                                        <SupervisedUserCircleIcon sx={{ mr: 1, color: '#8A4EC4' }} />
                                        <Typography
                                            sx={{
                                                flexGrow: 1,
                                            }}>
                                            Players
                                        </Typography>
                                        <Typography
                                            sx={{
                                                pr: 2,
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}>
                                            {curReport.players.length}
                                        </Typography>
                                    </ListItem>
                                    <Divider />

                                    <ListItem button divider sx={{ p: 0.3, py: 0.7 }}>
                                        <HelpIcon sx={{ mr: 1, color: '#146BD5' }} />
                                        <Typography
                                            sx={{
                                                flexGrow: 1,
                                            }}>
                                            Questions
                                        </Typography>
                                        <Typography
                                            sx={{
                                                pr: 2,
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}>
                                            {curReport.analysisResults.length}
                                        </Typography>
                                    </ListItem>
                                    <Divider />

                                    <ListItem button sx={{ p: 0.3 }}>
                                        <AccessTimeFilledIcon sx={{ mr: 1, color: '#0AA9A9' }} />
                                        <Typography
                                            sx={{
                                                flexGrow: 1,
                                            }}>
                                            Time
                                        </Typography>
                                        <Typography
                                            sx={{
                                                pr: 2,
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}>
                                            {parseDeltaTimestampToString(curReport.timeEnd, curReport.timeStart)}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Box>
                            <Box
                                sx={{
                                    width: '50%',
                                    height: '100%',
                                    boxShadow: 4,
                                    borderRadius: 1,
                                    ml: 1,
                                    px: 1,
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <List component="nav" aria-label="mailbox folders" sx={{ width: '100%' }}>
                                    <ListItem button divider sx={{ p: 0.3 }}>
                                        <AccountCircleIcon sx={{ mr: 1, color: 'purple' }} />
                                        <Typography
                                            sx={{
                                                flexGrow: 1,
                                            }}>
                                            Author
                                        </Typography>
                                        <Typography
                                            sx={{
                                                pr: 2,
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}>
                                            {curReport.author}
                                        </Typography>
                                    </ListItem>
                                    <Divider />

                                    <ListItem button divider sx={{ p: 0.3, py: 0.7 }}>
                                        <AccessTimeFilledIcon sx={{ mr: 1, color: 'green' }} />
                                        <Typography
                                            sx={{
                                                flexGrow: 1,
                                            }}>
                                            Start at
                                        </Typography>
                                        <Typography
                                            sx={{
                                                pr: 2,
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}>
                                            {parseTimestampToString(curReport.timeStart)}
                                        </Typography>
                                    </ListItem>
                                    <Divider />

                                    <ListItem button sx={{ p: 0.3 }}>
                                        <AccessTimeFilledIcon sx={{ mr: 1, color: 'red' }} />
                                        <Typography
                                            sx={{
                                                flexGrow: 1,
                                            }}>
                                            End at
                                        </Typography>
                                        <Typography
                                            sx={{
                                                pr: 2,
                                                color: 'black',
                                                fontWeight: 'bold'
                                            }}>
                                            {parseTimestampToString(curReport.timeEnd)}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                // height: 'calc(100% - 7.5em - 16px )',
                                // maxHeight: 'calc(100% - 7.5em - 16px )',
                                // minHeight: 'calc(100% - 7.5em - 16px )',
                                boxShadow: 4,
                                borderRadius: 1,
                                p: 1,
                                backgroundColor: '#0d3179'
                            }}>
                            <Box
                                sx={{
                                    height: '2rem',
                                    display: 'flex',
                                    width: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '70%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography sx={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                        {'Summary players result (' + curReport.players.length + ')'}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: '30%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Button
                                        startIcon={<SortIcon />}
                                        variant='contained'
                                        color="inherit"
                                        size='small'
                                        style={{
                                            outline: 'none'
                                        }}
                                        sx={{
                                            fontSize: 15,
                                            textTransform: 'none',
                                            color: 'black',
                                            '&:hover': {
                                                color: 'black',
                                            }
                                        }}
                                    >
                                        Sort
                                    </Button>
                                </Box>
                            </Box>
                            <Stack
                                sx={{
                                    width: '100%',
                                    pt: 3
                                }}
                            >
                                <Box
                                    sx={{ width: '100%', height: '50px', border: '0.5px solid grey', display: 'flex', backgroundColor: 'skyblue', }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            height: '100%',
                                            width: '30%',
                                            border: '0.5px solid grey',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        Player's name
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            height: '100%',
                                            width: '20%',
                                            border: '0.5px solid grey',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        Points
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            height: '100%',
                                            width: '50%',
                                            border: '0.5px solid grey',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        Correct answer
                                    </Typography>
                                </Box>
                                {curReport.players.map((eachPlayers, indexPlayer) => {
                                    return (
                                        <Box
                                            key={'player' + indexPlayer + eachPlayers.name}
                                            sx={{
                                                width: '100%', height: '50px', backgroundColor: 'white', border: '0.5px solid grey', display: 'flex',
                                                '&:hover': {
                                                    backgroundColor: 'skyblue',
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 18,
                                                    height: '100%',
                                                    width: '30%',
                                                    border: '0.5px solid grey',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    display: 'flex'
                                                }}
                                            >
                                                {eachPlayers.name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: 18,
                                                    height: '100%',
                                                    width: '20%',
                                                    border: '0.5px solid grey',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    display: 'flex'
                                                }}
                                            >
                                                {eachPlayers.score}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: 18,
                                                    height: '100%',
                                                    width: '50%',
                                                    border: '0.5px solid grey',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    display: 'flex'
                                                }}
                                            >
                                                {eachPlayers.correctAns.map((item, indexItem) => {
                                                    if (indexItem + 1 === eachPlayers.correctAns.length) {
                                                        return item + 1 + ' ';
                                                    } else {
                                                        return item + 1 + ', ';
                                                    }
                                                })}
                                            </Typography>
                                        </Box>
                                    )
                                })}
                            </Stack>
                        </Box>
                    </Grid>
                </React.Fragment>
            }
        </Grid >
    );
};

const parseTimestampToString = (timestamp) => {
    const a = new Date(timestamp);
    const year = a.getFullYear();
    const month = a.getMonth()
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    return hour + ':' + min + ' ' + date + '/' + month + '/' + year;
}
const parseDeltaTimestampToString = (timeEnd, timeStart) => {

    const a = new Date((timeEnd - timeStart));
    // const hour = a.getHours();
    const min = a.getMinutes();
    const seconds = a.getSeconds();
    let formattedTime = '';
    // if (hour > 0) { formattedTime += hour + ' hour ' }
    if (min > 0) {
        // if (min > 1) {
        //     formattedTime += min + ' minutes ';
        // } else {
        //     formattedTime += min + ' minute ';
        // }
        formattedTime += min + ' min ';

    }
    if (seconds > 0) {
        // if (seconds > 1) {
        //     formattedTime += seconds + ' seconds';
        // } else {
        //     formattedTime += seconds + ' second';
        // }
        formattedTime += seconds + ' sec';
    }

    return formattedTime;
}
export default ReportDetails;
