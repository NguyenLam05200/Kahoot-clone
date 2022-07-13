import {
    Chip, Box, Stack, Grid, Paper, Button, Typography, Link, Divider, Tooltip,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    List,
    Collapse,
    ListItemButton,
    ListItemIcon,
    Backdrop,
    CircularProgress,

    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';


import { parseJwt } from '../../utils/axios';

import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
    clearState,
    deleteRoomByID,
    getRoomByID,
    roomSelector,
    setIsShowDeleteDialog,
} from './roomSlice';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


const DeleteDialog = (props) => {
    const { listRoom, indexCurRoom, isShowDeleteDialog } = useSelector(
        roomSelector
    );
    const curRoom = listRoom[indexCurRoom]
    const dispatch = useDispatch();

    const handleCloseDialogSave = () => {
        dispatch(setIsShowDeleteDialog(false))
    };

    const handleDeleteDialog = () => {
        dispatch(deleteRoomByID(curRoom._id))
    }

    const userName = parseJwt(localStorage.kahut_app_accessToken).name;
    return (
        <Dialog open={isShowDeleteDialog} onClose={handleCloseDialogSave} sx={{ width: '100%' }}>
            <DialogTitle>Delete this Kahut room?</DialogTitle>
            <DialogContent>
                <Stack spacing={2}  >
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: '250px',
                        }}
                        src={curRoom.quizImage}
                    />

                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: 25
                        }}
                    >{curRoom.quizTitle}</Typography>
                    <Stack spacing={1} direction='row' sx={{ mt: 3, width: '100%' }}>
                        <Chip label={curRoom.questions.length + " questions"} variant='outlined' size="medium" color="info" sx={{ px: 1, fontWeight: 'bold', fontSize: 15 }} />
                        <Chip label={curRoom.plays + " plays"} variant='outlined' size="medium" color="secondary" sx={{ px: 1, fontWeight: 'bold', fontSize: 15 }} />

                    </Stack>
                    <Divider />

                    <Stack spacing={2} direction='row'>
                        {userName.split(' ').length > 1 ?
                            <Avatar {...stringAvatar('Nguyen')} /> :
                            <Avatar sx={{ bgcolor: '#FF5722' }}>{userName.split(' ')[0][0]}</Avatar>
                        }
                        <Box>
                            <Typography>{userName}</Typography>
                            <Typography color="text.secondary">Updated 6 hours ago</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialogSave}>Cancel</Button>
                <Button onClick={handleDeleteDialog}>Delete</Button>
            </DialogActions>
        </Dialog >
    );
}

export default DeleteDialog;