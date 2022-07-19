import {
    Chip,
    Box,
    Stack,
    Grid,
    Divider,
    Button,
    ListItem,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableRowsIcon from '@mui/icons-material/TableRows';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { useSelector, useDispatch } from 'react-redux';
import {
    clearState,
    getAllReport,
    getAllRoom,
    roomSelector,
} from './roomSlice';
import { Link } from 'react-router-dom';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import SortIcon from '@mui/icons-material/Sort';
import DetailsIcon from '@mui/icons-material/Details';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';

function CircularProgressWithLabel(props) {
    const size = '72px';
    const thick = 6;
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
                sx={{ color: 'red' }}
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
                    <Typography component="div" sx={{ fontSize: 15, fontWeight: 'bold' }}>
                        {`${Math.round(props.value)}%`}
                    </Typography>
                    {/* <Typography component="div" sx={{ fontSize: 15, }}>
                        correct
                    </Typography> */}
                </Stack>
            </Box>
        </Box>
    );
}



const Report = () => {
    const { listRoom, listReport } = useSelector(
        roomSelector
    );

    const dispatch = useDispatch();

    const [listRoomMap, setListRoomMap] = useState([])

    useEffect(() => {
        if (!listRoom || listRoom.length === 0) {
            dispatch(getAllRoom())
        }
        if (!listReport || listReport.length === 0) {
            dispatch(getAllReport())
        }
        return () => {
            dispatch(clearState());
        };
    }, [dispatch, listReport, listRoom])

    useEffect(() => {
        if (listRoom && listRoom.length !== 0 && listReport.length !== 0 && listRoomMap.length === 0) {
            listReport.forEach(eachReport => {
                let isContaind = false;
                for (const [indexEachRoom, eachRoom] of listRoom.entries()) {
                    if (eachReport.quizID === eachRoom._id) {
                        setListRoomMap(old => [...old, indexEachRoom])
                        isContaind = true;
                    }
                }
                if (!isContaind) {
                    setListRoomMap(old => [...old, -1])
                }
            })
        }
    }, [listRoom, listReport, listRoomMap])

    const [selectedIndex, setSelectedIndex] = useState(2);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Grid container minHeight='calc(100% - 70px)' style={{ backgroundColor: 'white' }} sx={{ mt: 0.5 }}>
            <Grid item xs={2.5} sx={{ boxShadow: 5, py: 4, backgroundColor: 'inherit' }}>
                <List component="nav" sx={{ p: 0, m: 0, }}>
                    <ListItemButton
                        divider={true}
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <TableRowsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recycle"
                            sx={{ color: 'black', fontWeight: 'bold' }}
                        />
                    </ListItemButton>

                    <ListItemButton
                        divider={true}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <BusinessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Collaboration" />
                    </ListItemButton>

                    <ListItemButton
                        divider={true}
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Reports" />
                    </ListItemButton>
                </List>
            </Grid>
            <Grid item xs={9.5} >
                <Box sx={{ bgcolor: '#f9f9f9', height: '98.5%', mt: 0, ml: 1, px: 2 }}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            py: 4,
                        }}
                    >
                        <Stack direction='row' spacing={2} display='-webkit-inline-box' sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            boxShadow: 2,
                            p: 1,
                        }} >
                            <InputBase
                                variant='outline'
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'Search' }}
                                size='small'
                            />
                            <IconButton
                                style={{ outline: 'none' }}
                                type="submit" size='small' aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Stack>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}
                        >
                            <Button
                                startIcon={<SortIcon />}
                                variant="contained">
                                Sort
                            </Button>
                        </Box>
                    </Box>

                    <Divider sx={{ py: 1 }} orientation="horizontal" flexItem />
                    <List sx={{ width: '100%' }}>
                        {listReport.map((eachReport, index) => {
                            const room = listRoom[listRoomMap[index]]

                            var a = new Date(eachReport.timeStart);
                            var year = a.getFullYear();
                            var month = a.getMonth()
                            var date = a.getDate();
                            var hour = a.getHours();
                            var min = a.getMinutes();
                            var formattedTime = hour + ':' + min + ' ' + date + '/' + month + '/' + year;

                            return (
                                <ListItem
                                    divider={true}
                                    key={index}
                                    disablePadding
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        my: 1,
                                        boxShadow: 2,
                                    }}
                                >
                                    <Stack direction='row' spacing={2} width='100%' height='170px'
                                        sx={{
                                            p: 1
                                        }}
                                    >
                                        {room ?
                                            <React.Fragment>
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        width: '30%',
                                                        borderRadius: 2,
                                                    }}
                                                    src={room.quizImage}
                                                />
                                                <Box sx={{ flexGrow: 1, height: '100%', }}>
                                                    <Box display='flex' width='100%' height='50px'>
                                                        <Typography
                                                            sx={{
                                                                color: 'black',
                                                                fontWeight: 'bold',
                                                                fontSize: 30,
                                                                flexGrow: 1
                                                            }}>
                                                            {room.quizTitle}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                color: 'grey',
                                                                fontSize: 20,
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}>
                                                            Start at {formattedTime}
                                                        </Typography>
                                                    </Box>
                                                    <Stack
                                                        alignItems='flex-end'
                                                        spacing={2}
                                                        direction='row'
                                                        sx={{
                                                            height: 'calc(100% - 50px)',
                                                            width: '100%',
                                                            // pb: 1
                                                        }}
                                                    >
                                                        <Stack spacing={1}>
                                                            <Chip label={room.questions.length + " questions"} variant='outlined' size="medium" color="info" sx={{ px: 1, fontWeight: 'bold', fontSize: 18 }} />
                                                            <Chip label={room.plays ? room.plays + " plays" : "0 plays"} variant='outlined' size="medium" color="secondary" sx={{ px: 1, fontWeight: 'bold', fontSize: 18 }} />
                                                        </Stack>
                                                        <CircularProgressWithLabel
                                                            value={eachReport.percentRightTotal}
                                                            sx={{
                                                                color: "#66BF39",
                                                            }}
                                                        />
                                                        <Divider flexItem orientation='vertical' style={{ marginTop: 'auto' }} sx={{ height: '72px' }} />
                                                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                                            <Typography
                                                                sx={{ fontSize: 18, color: 'black' }}
                                                            >{eachReport.percentRightTotal}% correct</Typography>
                                                            <Typography
                                                                sx={{ fontSize: 18, color: 'black' }}
                                                            >{eachReport.players.length} players joined</Typography>
                                                        </Stack>
                                                        <Stack spacing={1}>
                                                            <Button variant='contained' color='warning'
                                                                endIcon={<DetailsIcon />}
                                                                component={Link}
                                                                to={`/user/reports/${eachReport._id}`}
                                                                style={{
                                                                    outline: 'none',
                                                                    textTransform: 'none',
                                                                }}
                                                                sx={{
                                                                    '&:hover': {
                                                                        color: 'white',
                                                                        textDecoration: 'none',
                                                                    }
                                                                }}
                                                            >Details</Button>
                                                            <Button variant='contained' color='error'
                                                                endIcon={<DeleteIcon />}
                                                                style={{
                                                                    outline: 'none',
                                                                    textTransform: 'none'
                                                                }}
                                                                sx={{
                                                                    '&:hover': {
                                                                        color: 'white',
                                                                        textDecoration: 'none',
                                                                    }
                                                                }}
                                                            >Delete</Button>
                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <Box sx={{
                                                    border: '2px grey dashed',
                                                    width: '30%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 2,
                                                }}>
                                                    <PhotoSizeSelectActualIcon sx={{
                                                        fontSize: '10em',
                                                        color: '#a2aaca',
                                                    }} />
                                                </Box>
                                                <Box sx={{ flexGrow: 1, height: '100%', }}>
                                                    <Box display='flex' width='100%' height='50px'>
                                                        <Typography
                                                            sx={{
                                                                color: 'black',
                                                                fontWeight: 'bold',
                                                                fontSize: 30,
                                                                flexGrow: 1
                                                            }}>
                                                            This quiz was removed!
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                color: 'grey',
                                                                fontSize: 20,
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}>
                                                            Start at {formattedTime}
                                                        </Typography>
                                                    </Box>
                                                    <Stack
                                                        alignItems='flex-end'
                                                        spacing={2}
                                                        direction='row'
                                                        sx={{
                                                            height: 'calc(100% - 50px)',
                                                            width: '100%',
                                                            // pb: 1
                                                        }}
                                                    >
                                                        <CircularProgressWithLabel
                                                            value={eachReport.percentRightTotal}
                                                            sx={{
                                                                color: "#66BF39",
                                                            }}
                                                        />
                                                        <Divider flexItem orientation='vertical' style={{ marginTop: 'auto' }} sx={{ height: '72px' }} />
                                                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                                            <Typography
                                                                sx={{ fontSize: 18, color: 'black' }}
                                                            >{eachReport.percentRightTotal}% correct</Typography>
                                                            <Typography
                                                                sx={{ fontSize: 18, color: 'black' }}
                                                            >{eachReport.players.length} players joined</Typography>
                                                        </Stack>
                                                        <Stack spacing={1}>
                                                            <Button variant='contained' color='warning'
                                                                endIcon={<DetailsIcon />}
                                                                component={Link}
                                                                to={`/user/reports/${eachReport._id}`}
                                                                style={{
                                                                    outline: 'none',
                                                                    textTransform: 'none',
                                                                }}
                                                                sx={{
                                                                    '&:hover': {
                                                                        color: 'white',
                                                                        textDecoration: 'none',
                                                                    }
                                                                }}
                                                            >Details</Button>
                                                            <Button variant='contained' color='error'
                                                                endIcon={<DeleteIcon />}
                                                                style={{
                                                                    outline: 'none',
                                                                    textTransform: 'none'
                                                                }}
                                                                sx={{
                                                                    '&:hover': {
                                                                        color: 'white',
                                                                        textDecoration: 'none',
                                                                    }
                                                                }}
                                                            >Delete</Button>
                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                            </React.Fragment>
                                        }


                                    </Stack>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Grid>
        </Grid >
    );
};

export default Report;
