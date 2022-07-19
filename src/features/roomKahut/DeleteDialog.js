import {
    Chip, Box, Stack, Button, Typography, Divider,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material'
import { useTranslation, } from "react-i18next";
import { parseJwt } from '../../utils/axios';

import { useSelector, useDispatch } from 'react-redux';
import {
    deleteRoomByID,
    roomSelector,
    setIsShowDeleteDialog,
} from './roomSlice';


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
    const { t, i18n } = useTranslation();
    const { listRoom, curRoom, isShowDeleteDialog } = useSelector(
        roomSelector
    );
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
                            <Avatar {...stringAvatar(userName)} /> :
                            <Avatar sx={{ bgcolor: '#FF5722' }}>{userName.split(' ')[0][0]}</Avatar>
                        }
                        <Box>
                            <Typography>{userName}</Typography>
                            <Typography color="text.secondary">{t("Updated 6 hours ago")}</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialogSave}>{t("Cancel")}</Button>
                <Button onClick={handleDeleteDialog}>{t("Delete")}</Button>
            </DialogActions>
        </Dialog >
    );
}

export default DeleteDialog;