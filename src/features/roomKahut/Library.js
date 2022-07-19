import {
  Chip,
  Avatar,
  Box,
  Stack,
  Grid,
  Divider,
  ButtonGroup,
  Button,
  ListItem,
  Checkbox,
  ListItemAvatar,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import TableRowsIcon from '@mui/icons-material/TableRows';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation, } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import {
  clearState,
  getAllRoom,
  roomSelector,
} from './roomSlice';
import { parseJwt } from '../../utils/axios';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'violet',
    color: 'black',
    boxShadow: theme.shadows[5],
    fontSize: 14,
    mx: 1,
  },
}));

const Library = () => {
  const { t, i18n } = useTranslation();
  const { listRoom } = useSelector(
    roomSelector
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!listRoom || listRoom.length === 0) {
      dispatch(getAllRoom())
    }
    return () => {
      dispatch(clearState());
    };
  }, [])

  const [selectedIndex, setSelectedIndex] = useState(2);
  const [checked, setChecked] = useState([]);


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
            <ListItemText primary={t("Kahuts")}
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
            <ListItemText primary={t("Courses")} />
          </ListItemButton>

          <ListItemButton
            divider={true}
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={t("My folders")} />
            <AddIcon onClick={(e) => { e.preventDefault(); alert('click me') }} />
          </ListItemButton>
        </List>
      </Grid>
      <Grid item xs={9.5} >
        <Box sx={{ bgcolor: '#f9f9f9', height: '98.5%', mt: 0, ml: 1, px: 2 }}>
          <Stack direction='row' spacing={2} display='-webkit-inline-box' sx={{ mt: 4 }}>
            <ButtonGroup variant="outlined" aria-label="outlined button group" size='medium'>
              <Button>{t("Recent")}</Button>
              <Button>{t("Draft")}(4)</Button>
              <Button>{t("Favotite")}</Button>
              <Button>{t("Shared with me")}</Button>
            </ButtonGroup>
            <Button variant="outlined" component="form"
              sx={{
                display: 'inline-flex',
                width: '25%'
              }} >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={t("Search")}
                inputProps={{ 'aria-label': 'Search' }}
                size='small'
              />
              <IconButton type="submit" size='small' aria-label="search">
                <SearchIcon />
              </IconButton>
            </Button>
          </Stack>
          <Divider sx={{ py: 3 }} orientation="horizontal" flexItem />
          <List sx={{ width: '100%' }}>
            {listRoom.map((eachRoom, index) => {
              const labelId = `checkbox-list-label-${index}`;
              return (
                <ListItem
                  sx={{ py: 1 }}
                  divider={true}
                  key={index}
                  secondaryAction={
                    <Stack direction='row' display='-webkit-inline-box'>
                      <Button
                        variant='text'
                        sx={{
                          color: 'black',
                          textTransform: 'none',
                          align: 'center'
                        }}
                        startIcon={<PersonIcon sx={{ color: 'green' }} />}
                      >
                        {parseJwt(localStorage.kahut_app_accessToken).name}
                      </Button>
                      <Divider orientation="vertical" flexItem />
                      <Button
                        startIcon={<PlayCircleOutlineIcon />}
                        variant='contained'
                        component={Link}
                        to={`/user/gameHost/${eachRoom._id}`}
                        target='_blank'
                        style={{
                          outline: 'none'
                        }}
                        sx={{
                          color: 'white',
                          textTransform: 'none',
                          align: 'center',
                          size: 'small',
                          '&:hover': {
                            color: 'white',
                            fontWeight: 'bold',
                          }
                        }}
                      >
                        {t("Play")}
                      </Button>
                      <Button
                        variant='contained'
                        color='warning'
                        component={Link}
                        to={`/user/details/${eachRoom._id}`}
                        style={{
                          outline: 'none'
                        }}
                        sx={{
                          mx: 2,
                          textTransform: 'none',
                          align: 'center',
                          size: 'small',
                          '&:hover': {
                            color: 'white',
                            fontWeight: 'bold',
                          }
                        }}
                      >
                        {t("Details")}
                      </Button>
                      <Divider orientation="vertical" flexItem />
                      <LightTooltip title="Edit this quiz" placement="top" >
                        <IconButton
                          component={Link}
                          to={`/user/edit/${eachRoom._id}`}
                          style={{ outline: 'none' }}
                          sx={{
                            mx: 0.5,
                            '&:hover': {
                              backgroundColor: 'plum',
                            }
                          }}
                          edge="end" aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </LightTooltip >
                      <LightTooltip title="Settings" placement="top" >
                        <IconButton
                          style={{ outline: 'none' }}
                          sx={{
                            mx: 0.5,
                            '&:hover': {
                              backgroundColor: 'plum',
                            }
                          }}
                          edge="end" aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      </LightTooltip >

                    </Stack>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemAvatar sx={{
                      width: '8rem',
                      height: '8rem',
                    }}>
                      <Avatar sx={{ width: '100%', height: '100%', borderRadius: 2 }} alt="Image alt" src={eachRoom.quizImage} variant="square" />
                    </ListItemAvatar>
                    <Stack
                      sx={{
                        px: 2,
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="h5"
                        color="text.primary"
                        fontWeight='bold'
                      >
                        {eachRoom.quizTitle}
                      </Typography>
                      <Stack spacing={1} direction='row' sx={{ mt: 3 }}>
                        <Chip label={eachRoom.questions.length + t(" questions")} variant='outlined' size="medium" color="info" sx={{ px: 1, fontWeight: 'bold', fontSize: 15 }} />
                        <Chip label={eachRoom.plays ? eachRoom.plays + t(" plays") : "0" + t("plays")} variant='outlined' size="medium" color="secondary" sx={{ px: 1, fontWeight: 'bold', fontSize: 15 }} />
                      </Stack>
                    </Stack>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Grid>
    </Grid >
  );
};

export default Library;
