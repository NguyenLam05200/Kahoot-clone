import { Chip, Badge, Avatar, Box, Stack, Grid, Paper, Divider, ButtonGroup, Button, ListItem, Checkbox, ListItemAvatar, ListSubheader, Typography } from '@mui/material'
import Navbar from '../user/Navbar';
import { useState } from 'react'
import TableRowsIcon from '@mui/icons-material/TableRows';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Container } from '@mui/system';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import CommentIcon from '@mui/icons-material/Comment';

const Library = () => {
  const [listRoom, setListRoom] = useState([
    {
      img: "https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg",
      room_title: "Bai Kiem Tra So 1",
      num_question: 2,
    },
    {
      img: "https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg",
      room_title: "Bai Kiem Tra So 2",
      num_question: 6,
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(1);
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
    < >
      <Navbar />
      <Grid container height='calc(100% - 70px)'>
        <Grid item xs={2.5} sx={{ boxShadow: 5, py: 4, backgroundColor: 'inherit' }}>
          <List component="nav" sx={{ p: 0, m: 0 }}>
            <ListItemButton
              divider={true}
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <TableRowsIcon />
              </ListItemIcon>
              <ListItemText primary="Kahuts"
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
              <ListItemText primary="Courses" />
            </ListItemButton>

            <ListItemButton
              divider={true}
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="My folders" />
              <AddIcon onClick={(e) => { e.preventDefault(); alert('click me') }} />
            </ListItemButton>
          </List>
        </Grid>
        <Grid item xs={9.5} >
          <Box sx={{ bgcolor: '#f9f9f9', height: '98.5%', mt: 1, ml: 1, px: 2 }}>
            <Stack direction='row' spacing={2} display='-webkit-inline-box' sx={{ mt: 4 }}>
              <ButtonGroup variant="outlined" aria-label="outlined button group" size='medium'>
                <Button>Recent</Button>
                <Button>Draft(4)</Button>
                <Button>Favorites</Button>
                <Button>Shared with me</Button>
              </ButtonGroup>
              <Button variant="outlined" component="form"
                sx={{
                  display: 'inline-flex',
                  width: '25%'
                }} >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
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
              {listRoom.map((room, index) => {
                const labelId = `checkbox-list-label-${index}`;
                return (
                  <ListItem
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
                          Huy Doan
                        </Button>
                        <Divider orientation="vertical" flexItem />
                        <Button
                          variant='contained'
                          sx={{
                            color: 'white',
                            textTransform: 'none',
                            align: 'center',
                            size: 'small'
                          }}
                        >
                          Play
                        </Button>
                        <Divider orientation="vertical" flexItem />
                        <IconButton edge="end" aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
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
                        <Avatar sx={{ width: '100%', height: '100%', borderRadius: 2 }} alt="Image alt" src={room.img} variant="square" />
                      </ListItemAvatar>
                      {/* <ListSubheader>
                        <Chip label={room.num_question + " questions"} variant='filled' color="success" sx={{ mx: 2, px: 1 }} />
                      </ListSubheader> */}
                      <ListItemText sx={{ px: 2, }} id={labelId}
                        primary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h5"
                            color="text.primary"
                            fontWeight='bold'
                          >
                            {room.room_title}
                          </Typography>
                        }
                        secondary={
                          <Chip label={room.num_question + " questions"} variant='outlined' color="info" sx={{ mt: 1, px: 1, fontWeight: 'bold', fontSize: 15 }} />
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Library;
