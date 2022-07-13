import {
  MenuItem,
  CardActionArea,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  TextField,
  Box,
  Stack,
  Grid,
  Paper,
  Divider,
  Typography,
  Container,
  Button,
  InputBase,
  Checkbox,
  Fab,
  Menu,
  ListItemIcon,
  ListItemText,
  FormControl,
  Popover,
  Collapse,
  Alert,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'


import { useSelector, useDispatch } from 'react-redux';
import {
  roomSelector,
  createNewRoom,
  clearState
} from './roomSlice';
import { useNavigate } from 'react-router-dom';


import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import { useEffect, useState, useRef } from 'react'


import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import DoneIcon from '@mui/icons-material/Done';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import QuizIcon from '@mui/icons-material/Quiz';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

import AssistantIcon from '@mui/icons-material/Assistant';
import LocationDisabledIcon from '@mui/icons-material/LocationDisabled';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useSnackbar } from 'notistack';

import { answerUI2 } from '../../components/AnswerUI';

import { styled } from '@mui/material/styles';
const Input = styled('input')({
  display: 'none',
});

const schemaQuiz = {
  type: 0, //0: Quiz, 1: True or False, 2: Multi selections
  img: null,
  time: 20,
  text: 'XXX',
  ans: [
    { text: 'a', isRight: true },
    { text: 's', isRight: false },
    { text: 'd', isRight: false },
    { text: 'f', isRight: false },
  ],
  points: 1 //0: no points, 1: standard, 2: double
}

const schemaTrueOrFalse = {
  type: 1, //0: Quiz, 1: True or False, 2: Multi selections
  img: '',
  time: 20,
  text: '',
  ans: [
    { text: '', isRight: false },
    { text: '', isRight: false },
  ],
  points: 1 //0: no points, 1: standard, 2: double
}

const CreateKahut = () => {
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    roomSelector
  );

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      setOpen(true)
      dispatch(clearState());
      window.setTimeout(function () {
        if (open) {
          setOpen(false)
        }
      }, 3000);
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate('/user/library');
    }
  }, [isError, isSuccess]);

  const [listQuestion, setListQuestion] = useState([
    JSON.parse(JSON.stringify(schemaQuiz))
  ]);

  const handleChangeImageUpload = (event) => {
    listQuestion[curQuestion].img = event.target.files[0]
    setListQuestion([...listQuestion])
  }
  const handleDeleteImageUpload = (event) => {
    listQuestion[curQuestion].img = ''
    setListQuestion([...listQuestion])
  }

  const [curQuestion, setCurQuestion] = useState(0);
  const [curHover, setCurHover] = useState(-1);
  const [curHoverAnscheck, setCurHoverAnscheck] = useState(-1);

  const handleListQuestionNav = (event, index) => {
    setCurQuestion(index);
  };

  const handleChangeQuestionTitle = (event) => {
    listQuestion[curQuestion].text = event.target.value;
    setListQuestion([...listQuestion])
  };

  const handleChangeAns = (event, index) => {
    listQuestion[curQuestion].ans[index].text = event.target.value;
    setListQuestion([...listQuestion])
  };


  const handleChangeCorrectAns = (event, value) => {
    let QuestionPersist = listQuestion[curQuestion]
    QuestionPersist.ans[value].isRight = !QuestionPersist.ans[value].isRight
    let i = 0;
    QuestionPersist.ans.map(eachAns => {
      eachAns.isRight && i++;
    })
    if (i > 1) QuestionPersist.type = 2
    else if (i === 1) QuestionPersist.type = 0
    if (i === 1 && QuestionPersist.ans.length === 2) QuestionPersist.type = 1
    setListQuestion([...listQuestion])
  };

  const [isAddMore, setIsAddMore] = useState(listQuestion[curQuestion].ans.length <= 4);
  useEffect(() => {
    setIsAddMore(listQuestion[curQuestion].ans.length <= 4)
  }, [curQuestion]);

  const handleClickAddMoreAnswer = () => {
    if (isAddMore) {
      listQuestion[curQuestion].ans.push({ text: '', isRight: false })
      listQuestion[curQuestion].ans.push({ text: '', isRight: false })
      if (listQuestion[curQuestion].type === 1) {
        listQuestion[curQuestion].type = 0
      }
      // listQuestion[curQuestion].type === 1 && setSelectedIndexQuestionType(0)
    } else {
      listQuestion[curQuestion].ans.splice(-2, 2);
      if (listQuestion[curQuestion].ans.length === 2) {
        listQuestion[curQuestion].type = 0
        // setSelectedIndexQuestionType(1)
      }
    }
    setListQuestion(listQuestion)

    setIsAddMore(!isAddMore)
  }

  // choose type ques
  const cssIcon = {
    color: '#18bd80',
    fontSize: 25,
    fontWeight: 'bold'
  }
  const optionsQuestionType = [
    { text: 'Quiz', icon: <QuizIcon sx={cssIcon} /> },
    {
      text: 'True or False', icon: <PhonelinkEraseIcon sx={cssIcon} />
    },
    { text: 'Multi selections', icon: <DynamicFeedIcon sx={cssIcon} /> },
  ];
  const [anchorElQuestionType, setAnchorElQuestionType] = useState(null);

  const openQuestionType = Boolean(anchorElQuestionType);
  const handleClickListItemQuestionType = (event) => {
    setAnchorElQuestionType(event.currentTarget);
  };

  const handleMenuItemClickQuestionType = (event, index) => {
    if (index === 1) { // True or False
      if (listQuestion[curQuestion].ans.length >= 2) {
        listQuestion[curQuestion].ans.splice(2);
      }
    } else { // Quiz || Multi selections 
      if (listQuestion[curQuestion].ans.length === 2) {
        listQuestion[curQuestion].ans.push({ text: '', isRight: false })
        listQuestion[curQuestion].ans.push({ text: '', isRight: false })
      }
    }
    listQuestion[curQuestion].type = index
    setListQuestion([...listQuestion])
    setAnchorElQuestionType(null);
  };

  const handleCloseQuestionType = () => {
    setAnchorElQuestionType(null);
  };

  // choose time limit 
  const optionsTimeLimit = [5, 10, 15, 20, 30, 60, 90, 120, 240];
  const [anchorElTimeLimit, setAnchorElTimeLimit] = useState(null);
  const openTimeLimit = Boolean(anchorElTimeLimit);

  const handleClickListItemTimeLimit = (event) => {
    setAnchorElTimeLimit(event.currentTarget);
  };

  const handleMenuItemClickTimeLimit = (event, index) => {
    listQuestion[curQuestion].time = optionsTimeLimit[index];
    setListQuestion([...listQuestion])
    setAnchorElTimeLimit(null);
  };

  const handleCloseTimeLimit = () => {
    setAnchorElTimeLimit(null);
  };

  // choose points 
  const optionsPoints = [
    { text: 'No points', icon: <LocationDisabledIcon sx={cssIcon} /> },
    {
      text: 'Standard', icon: <GpsFixedIcon sx={cssIcon} />
    },
    { text: 'Double points', icon: <AutoAwesomeIcon sx={cssIcon} /> },
  ];
  const [anchorElPoints, setAnchorElPoints] = useState(null);
  // const [selectedIndexPoints, setSelectedIndexPoints] = useState(1);
  const openPoints = Boolean(anchorElPoints);
  const handleClickListItemPoints = (event) => {
    setAnchorElPoints(event.currentTarget);
  };

  const handleMenuItemClickPoints = (event, index) => {
    listQuestion[curQuestion].points = index;
    setListQuestion([...listQuestion])
    setAnchorElPoints(null);
  };

  const handleClosePoints = () => {
    setAnchorElPoints(null);
  };

  // add question:
  const [anchorElAddQuestion, setAnchorElAddQuestion] = useState(null);

  const handleClickAddQuestion = (event) => {
    setAnchorElAddQuestion(event.currentTarget);
  };

  const handleCloseAddQuestion = () => {
    setAnchorElAddQuestion(null);
  };

  const openAddQuestion = Boolean(anchorElAddQuestion);
  const handleMenuItemClickAddQuestion = (event, type) => {
    if (type === 0) {
      setListQuestion([...listQuestion, JSON.parse(JSON.stringify(schemaQuiz))])
    } else if (type === 1) {
      setListQuestion([...listQuestion, JSON.parse(JSON.stringify(schemaTrueOrFalse))])
    }
    setCurQuestion(listQuestion.length)
    setAnchorElAddQuestion(null);
  }

  // save kahut:
  const [openDialogSave, setOpenDialogSave] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [roomTitle, setRoomTile] = useState('');
  const [roomImage, setRoomImage] = useState('');

  const handleCloseDialogSave = () => {
    setOpenDialogSave(false);
  };

  const handleClickSaveKahut = () => {
    let isOK = true;
    listQuestion.map((eachQuestion, index) => {
      let isChooseAnswerCorrect = false;
      let isErrorAddanswer = false;
      // let msgError = '';
      eachQuestion.ans.map((eachAns, i) => {
        if (!eachAns.text) {
          // msgError += ' ' + i + ',';
          isErrorAddanswer = true;
        }
        if (eachAns.isRight) {
          isChooseAnswerCorrect = true;
        }
      })
      if (isErrorAddanswer) {
        isOK = false;
        enqueueSnackbar('Quiz ' + (index + 1) + ' : Please add all answer', { variant: 'error' });
      }
      if (!isChooseAnswerCorrect) {
        isOK = false;
        enqueueSnackbar('Quiz ' + (index + 1) + ' : Please choose at least 1 correct answer', { variant: 'error' });
      }
    })
    if (isOK) {
      setOpenDialogSave(true);
    }
  }

  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const handleSaveDialogSave = () => {
    if (roomTitle) {
      dispatch(createNewRoom({ roomTitle, roomImage, listQuestion }))
      setOpenDialogSave(false);
    } else {
      setOpenErrorDialog(true)
      window.setTimeout(function () {
        if (openErrorDialog) {
          setOpenErrorDialog(false)
        }
      }, 3000);
    }
  }

  const handleChangeRoomTitle = (event) => {
    setRoomTile(event.target.value);
  }

  const handleChangeRoomImage = (event) => {
    setRoomImage(event.target.files[0])
  }

  return (
    <Grid container height='calc(100% - 70px)' sx={{ pt: 0.5 }}>
      <Dialog open={openDialogSave} onClose={handleCloseDialogSave} sx={{ width: '100%' }}>
        <DialogTitle>Enter title:</DialogTitle>
        <DialogContent>
          <Stack
            alignItems='center'
            justifyContent='center'
            spacing={2}
            sx={{
              width: '100%',
              height: '100%',
            }}>
            {
              openErrorDialog &&
              <Collapse in={openErrorDialog}>
                <Alert severity="error">Please fill in title field!</Alert>
              </Collapse>
            }
            <TextField
              autoFocus
              value={roomTitle}
              onChange={handleChangeRoomTitle}
              margin="dense"
              id="name"
              label="Kahut title"
              type="text"
              fullWidth
              variant="standard"
            />
            <Box sx={{
              width: '80%',
              height: '70%',
              border: '1px dashed',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {roomImage ?
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    height: '100%',
                    p: 1,
                  }}
                  src={URL.createObjectURL(roomImage)}
                />
                :
                <PhotoSizeSelectActualIcon sx={{ color: '#5a5a5a', fontSize: 200 }} />
              }
            </Box>
            {roomImage && <Typography><u>File name:</u> {roomImage.name}</Typography>}
            <Stack direction='row' alignItems='center' justifyContent='center' spacing={2}>
              <label htmlFor="contained-button-file-room-image" >
                <Input
                  // value={imageUpload}
                  onChange={handleChangeRoomImage}
                  accept="image/*"
                  id="contained-button-file-room-image"
                  type="file"
                />
                <Button variant="contained" component="span" startIcon={<PhotoCamera />}
                  sx={{
                    textTransform: 'none'
                  }}
                >
                  {roomImage ? 'Change image' : 'Upload image'}
                </Button>
              </label>
              {roomImage &&
                <Button
                  onClick={() => setRoomImage('')}
                  variant="contained" color='error' sx={{ textTransform: 'none', bottom: '3px' }} startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              }
            </Stack>
          </Stack>
          <DialogContentText>
            You will use the image cover default if not choose any image!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogSave}>Cancel</Button>
          <Button onClick={handleSaveDialogSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        width='20%'
        height='100%'
        boxShadow={5}
        sx={{ justifyContent: 'center' }}
      >
        <List component="nav" sx={{
          p: 0, m: 0,
          width: '100%',
          height: 'calc(100% - 90px)',
          position: 'relative',
          overflow: 'auto',
        }}>
          {listQuestion.map((eachQuestion, index) => (
            <ListItemButton
              key={'question ' + index}
              divider={true}
              selected={curQuestion === index}
              onClick={(event) => handleListQuestionNav(event, index)}
              sx={{ pl: 0.5 }}
              onMouseOver={() => setCurHover(index)}
              onMouseOut={() => setCurHover(-1)}
            >
              <Box sx={{
                width: '100%',
                height: 140,
                mb: 1
              }}>
                <Typography sx={{
                  height: '23px',
                  pl: 2,
                  fontSize: 13,
                  fontWeight: 'bold'
                }}>{index + 1}. {optionsQuestionType[eachQuestion.type].text}</Typography>
                <Box sx={{
                  height: 'calc(100% - 23px)',
                  width: '100%',
                  display: 'flex'
                }}>
                  <Stack justifyContent='flex-end' alignItems='center' spacing={1}
                    sx={{
                      pr: 0.5,
                      width: '18px',
                      height: '100%',
                    }}
                  >
                    {curHover === index || curQuestion === index ?
                      <>
                        <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                        <DeleteIcon sx={{ fontSize: '1rem' }} />
                      </> : <></>}
                  </Stack>
                  <Box
                    sx={{
                      boxShadow: 3,
                      px: 1,
                      py: 0.5,
                      width: 'calc(100% - 18px)',
                      height: '100%',
                      backgroundColor: curQuestion === index ? '#fff' : '#f2f2f2',
                      borderRadius: 1,
                      border: curHover === index && '2px solid',
                      borderColor: curHover === index && '#92a8d1',
                      borderCollapse: curHover === index && 'separate'
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        width: '100%',
                        height: '20px',
                        fontSize: 14,
                      }}
                      textAlign="center"
                    >
                      {eachQuestion.text ? eachQuestion.text : 'Question'}
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        height: '55px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: '25px',
                          height: '25px',
                          borderRadius: '50%',
                          backgroundColor: curQuestion === index ? '#f2b4ff' : '#fddddd',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'black',
                          fontSize: 11,
                          fontWeight: 'bold'
                        }}
                      >
                        {eachQuestion.time}
                      </Box>
                      <Box
                        sx={{
                          height: '100%',
                          width: 'calc(100% - 25px - 25px)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {eachQuestion.img ?

                          <Box
                            component="img"
                            sx={{
                              width: '70px',
                              height: '40px',
                            }}
                            src={URL.createObjectURL(eachQuestion.img)}
                          />
                          :
                          <Box sx={{
                            width: '70px',
                            height: '40px',
                            border: '0.5px dashed',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                            <PhotoSizeSelectActualIcon sx={{ color: '#5a5a5a' }} />
                          </Box>
                        }
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        pb: 1,
                        height: 'calc(100% - 75px)',
                        width: '100%',
                        display: 'grid',
                        gap: 0.3,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                      }}
                    >
                      {eachQuestion.ans.map((eachAns, i) => (
                        <Box
                          key={index + ' ' + i}
                          sx={{
                            px: 1,
                            border: '1px solid grey',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}
                        >
                          {eachAns.isRight ?
                            <DoneIcon sx={{
                              fontSize: eachQuestion.ans.length <= 4 ? 13 : 7,
                              color: '#07BA66'
                            }} />
                            :
                            <DoneIcon sx={{
                              fontSize: eachQuestion.ans.length <= 4 ? 13 : 7,
                              color: curQuestion === index ? 'white' : '#f2f2f2'
                            }} />
                          }
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </ListItemButton>
          ))}
        </List>
        <Stack spacing={1} margin={2}  >
          <Button
            onClick={handleClickAddQuestion}
            style={{
              border: 'none',
              outline: 'none'
            }}
            variant='contained'
            size='small'
            sx={{
              boxShadow: 8,
              textTransform: 'none',
              '&:hover': {
                fontWeight: 'bold',
                boxShadow: 2,
              }
            }}
          >Add question</Button>
          <Menu
            id="add-new-question-menu"
            anchorEl={anchorElAddQuestion}
            open={openAddQuestion}
            onClose={handleCloseAddQuestion}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
          >
            <MenuItem
              onClick={(event) => handleMenuItemClickAddQuestion(event, 0)}
            >
              <ListItemIcon>
                {optionsQuestionType[0].icon}
              </ListItemIcon>
              <ListItemText>
                {optionsQuestionType[0].text}
              </ListItemText>
            </MenuItem>
            <MenuItem
              onClick={(event) => handleMenuItemClickAddQuestion(event, 1)}
            >
              <ListItemIcon>
                {optionsQuestionType[1].icon}
              </ListItemIcon>
              <ListItemText>
                {optionsQuestionType[1].text}
              </ListItemText>
            </MenuItem>
          </Menu>

          <Button
            onClick={handleClickSaveKahut}
            color='success'
            style={{
              border: 'none',
              outline: 'none'
            }}
            variant='contained'
            size='small'
            sx={{
              boxShadow: 8,
              textTransform: 'none',
              '&:hover': {
                fontWeight: 'bold',
                boxShadow: 2,
              }
            }}
          >Save Kahut</Button>
        </Stack>
      </Box>
      <Stack
        spacing={2}
        alignItems='center'
        width='60%'
        height='100%'
        sx={{
          px: 2,
          py: 1,
          backgroundColor: '#F2F2F1'
        }}
      >
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <InputBase
            multiline
            maxRows={2}
            value={listQuestion[curQuestion].text}
            onChange={handleChangeQuestionTitle}
            sx={{
              width: '100%',
              mx: 1,
              fontSize: 25,
            }}
            placeholder="Start typing your question"
            inputProps={{
              style: {
                textAlign: 'center'
              }
            }}
          />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            m: 2,
            width: '60%',
            flex: '1 1 auto',
          }}
        >
          <Stack
            alignItems='center'
            justifyContent='center'
            spacing={1}
            sx={{
              width: '100%',
              height: '100%',
            }}>
            <Box sx={{
              width: '80%',
              height: '70%',
              border: '1px dashed',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {listQuestion[curQuestion].img ?
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    height: '100%',
                    p: 1,
                  }}
                  src={URL.createObjectURL(listQuestion[curQuestion].img)}
                />
                :
                <PhotoSizeSelectActualIcon sx={{ color: '#5a5a5a', fontSize: 200 }} />
              }
            </Box>
            {listQuestion[curQuestion].img && <Typography><u>File name:</u> {listQuestion[curQuestion].img.name}</Typography>}
            <Stack direction='row' alignItems='center' justifyContent='center' spacing={2}>
              <label htmlFor="contained-button-file" >
                <Input
                  // value={imageUpload}
                  onChange={handleChangeImageUpload}
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                />
                <Button variant="contained" component="span" startIcon={<PhotoCamera />}
                  sx={{
                    textTransform: 'none'
                  }}
                >
                  {listQuestion[curQuestion].img ? 'Change image' : 'Upload image'}
                </Button>
              </label>
              {listQuestion[curQuestion].img &&
                <Button
                  onClick={handleDeleteImageUpload}
                  variant="contained" color='error' sx={{ textTransform: 'none', bottom: '3px' }} startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              }
            </Stack>


          </Stack>
        </Paper>
        <Box
          sx={{
            width: '100%',
            height: '30%',
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}>
          {listQuestion[curQuestion].ans.map((eachAns, index) => (
            <Stack
              key={'ans ' + index}
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: eachAns === '' ? 'white' : answerUI2[index].bgColor,
                boxShadow: 2,
              }}
            >
              <Box
                sx={{
                  borderRadius: 1,
                  height: '100%',
                  width: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: answerUI2[index].bgColor,
                  color: 'white'
                }}
              >
                {answerUI2[index].icon}
              </Box>
              <InputBase
                multiline
                maxRows={1}
                value={eachAns.text}
                onChange={(event) => handleChangeAns(event, index)}
                sx={{
                  flexGrow: 1,
                  // width: '100%',
                  mx: 1,
                  fontSize: 17,
                  color: 'white'
                }}
                placeholder={"Add answer " + (index + 1)}
                inputProps={{
                  style: {
                    textAlign: 'left'
                  }
                }}
              />
              <IconButton
                component="span"
                onClick={(event) => handleChangeCorrectAns(event, index)}
                onMouseOver={() => {
                  !eachAns.isRight && setCurHoverAnscheck(index)
                }}
                onMouseOut={() => setCurHoverAnscheck(-1)}
                size='large'
                style={{
                  outline: 'none'
                }}
                sx={{
                  p: 0,
                  m: 1,
                  border: '3px solid white',
                  backgroundColor: eachAns.isRight && '#59B32C'
                }}
              >
                {curHoverAnscheck === index ?
                  <DoneIcon sx={{ color: 'white' }} /> :
                  <DoneIcon
                    sx={{
                      color: eachAns.isRight ? '#fff' : answerUI2[index].bgColor
                    }}
                  />}
              </IconButton>
            </Stack>
          ))}
        </Box>
      </Stack>
      <Box
        width='20%'
        height='100%'
        boxShadow={5}
        sx={{ px: 2, pt: 2 }}
      >
        <Box
          sx={{
            height: 'calc(100% - 120px)',
            width: '100%',
          }}
        >
          <Stack
            direction='row'
            alignItems="center"
            spacing={1}
            sx={{
              width: '100%'
            }}>
            <MergeTypeIcon sx={{ color: '#ff5959', fontSize: 30, fontWeight: 'bold' }} />
            <Typography sx={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20
            }}>
              Question type
            </Typography>
          </Stack>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
            <Fab
              onClick={handleClickListItemQuestionType}
              variant="extended"
              style={{
                border: "1px solid grey",
                outline: "none",
                borderRadius: 5,
              }}
              size="small"
              sx={{
                my: 1,
                width: '100%',
                textTransform: 'none',
                color: 'black',
                backgroundColor: 'white',
                justifyContent: 'flex-start'
              }}>
              {/* <LanguageIcon fontSize="medium" sx={{ mr: 1, color: 'black' }} /> */}
              {optionsQuestionType[listQuestion[curQuestion].type].icon}
              <Typography noWrap sx={{ px: 2 }}>
                {optionsQuestionType[listQuestion[curQuestion].type].text}
              </Typography>
              <Box
                sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}
              >
                {openQuestionType ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Box>
            </Fab>
            <Menu
              id="lock-menu"
              anchorEl={anchorElQuestionType}
              open={openQuestionType}
              onClose={handleCloseQuestionType}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {optionsQuestionType.map((option, index) => (
                <MenuItem
                  key={'choose quiz ' + index}
                  selected={index === listQuestion[curQuestion].type}
                  onClick={(event) => handleMenuItemClickQuestionType(event, index)}
                >
                  <ListItemIcon>
                    {/* <ContentCut fontSize="small" /> */}
                    {option.icon}
                  </ListItemIcon>
                  <ListItemText>
                    {option.text}
                  </ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Stack
            direction='row'
            alignItems="center"
            spacing={1}
            sx={{
              width: '100%'
            }}>
            <AccessAlarmsIcon sx={{ color: '#ff5959', fontSize: 30, fontWeight: 'bold' }} />
            <Typography sx={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20
            }}>
              Time limit
            </Typography>
          </Stack>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
            <Fab
              onClick={handleClickListItemTimeLimit}
              variant="extended"
              style={{
                border: "1px solid grey",
                outline: "none",
                borderRadius: 5,
              }}
              size="small"
              sx={{
                my: 1,
                width: '100%',
                textTransform: 'none',
                color: 'black',
                backgroundColor: 'white',
                justifyContent: 'flex-start'
              }}>
              <Typography noWrap sx={{ px: 1 }}>
                {listQuestion[curQuestion].time / 60 >= 2 && Math.floor(listQuestion[curQuestion].time / 60) + ' minutes '}
                {listQuestion[curQuestion].time / 60 === 1 && Math.floor(listQuestion[curQuestion].time / 60) + ' minute '}
                {listQuestion[curQuestion].time % 60 >= 1 && listQuestion[curQuestion].time % 60 + ' seconds'}
              </Typography>
              <Box
                sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}
              >
                {openTimeLimit ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Box>
            </Fab>
            <Menu
              id="lock-menu"
              anchorEl={anchorElTimeLimit}
              open={openTimeLimit}
              onClose={handleCloseTimeLimit}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {optionsTimeLimit.map((option, index) => (
                <MenuItem
                  key={'choose quiz ' + index}
                  selected={index === optionsTimeLimit.indexOf(listQuestion[curQuestion].time)}
                  onClick={(event) => handleMenuItemClickTimeLimit(event, index)}
                >
                  <ListItemText>
                    {option / 60 >= 2 && Math.floor(option / 60) + ' minutes '}
                    {option / 60 === 1 && Math.floor(option / 60) + ' minute '}
                    {option % 60 >= 1 && option % 60 + ' seconds'}
                  </ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Stack
            direction='row'
            alignItems="center"
            spacing={1}
            sx={{
              width: '100%'
            }}>
            <AssistantIcon sx={{ color: '#ff5959', fontSize: 30, fontWeight: 'bold' }} />
            <Typography sx={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20
            }}>
              Points
            </Typography>
          </Stack>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
            <Fab
              onClick={handleClickListItemPoints}
              variant="extended"
              style={{
                border: "1px solid grey",
                outline: "none",
                borderRadius: 5,
              }}
              size="small"
              sx={{
                my: 1,
                width: '100%',
                textTransform: 'none',
                color: 'black',
                backgroundColor: 'white',
                justifyContent: 'flex-start'
              }}>
              {/* <LanguageIcon fontSize="medium" sx={{ mr: 1, color: 'black' }} /> */}
              {optionsPoints[listQuestion[curQuestion].points].icon}
              <Typography noWrap sx={{ px: 2 }}>
                {optionsPoints[listQuestion[curQuestion].points].text}
              </Typography>
              <Box
                sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}
              >
                {openPoints ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Box>
            </Fab>
            <Menu
              id="lock-menu"
              anchorEl={anchorElPoints}
              open={openPoints}
              onClose={handleClosePoints}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {optionsPoints.map((option, index) => (
                <MenuItem
                  key={'choose quiz ' + index}
                  selected={index === listQuestion[curQuestion].points}
                  onClick={(event) => handleMenuItemClickPoints(event, index)}
                >
                  <ListItemIcon>
                    {/* <ContentCut fontSize="small" /> */}
                    {option.icon}
                  </ListItemIcon>
                  <ListItemText>
                    {option.text}
                  </ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>

        <Stack spacing={1} height='120px' justifyContent='flex-end' p={1}>
          <Button
            onClick={handleClickAddMoreAnswer}
            disabled={!isAddMore}
            color='info'
            style={{
              outline: 'none'
            }}
            variant='contained'
            size='small'
            sx={{
              boxShadow: 8,
              textTransform: 'none',
              '&:hover': {
                fontWeight: 'bold',
                boxShadow: 2,
              }
            }}
          >Add more answer</Button>
          <Button
            onClick={handleClickAddMoreAnswer}
            disabled={isAddMore}
            color='error'
            style={{
              outline: 'none'
            }}
            variant='contained'
            size='small'
            sx={{
              boxShadow: 8,
              textTransform: 'none',
              '&:hover': {
                fontWeight: 'bold',
                boxShadow: 2,
              }
            }}
          >Remove additional answers</Button>
        </Stack>
      </Box>
    </Grid >
  );
};

export default CreateKahut;
