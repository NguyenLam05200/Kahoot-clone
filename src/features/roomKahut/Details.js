import {
  Chip,
  Box,
  Stack,
  Grid,
  Button,
  Typography,
  Divider,
  Tooltip,
  ListItem,
  ListItemAvatar,
  Avatar,
  List,
  Collapse,
  Backdrop,
  CircularProgress
} from '@mui/material'
import {
  useState
} from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import { parseJwt } from "../../utils/axios";

import { useNavigate, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearState,
  getRoomByID,
  roomSelector,
  setInitCurRoom,
  setIsShowDeleteDialog,
} from "./roomSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { answerUI2 } from "../../components/AnswerUI";
import DeleteDialog from "./DeleteDialog";


import {
  optionsPoints,
  optionsQuestionType,
} from '../../utils/utilities'

import { useTranslation, } from "react-i18next";



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

function NestedList(props) {
  const { t, i18n } = useTranslation();
  const listQuestion = props.listQuestion;

  const [open, setOpen] = useState(new Array(listQuestion.length).fill(false));

  useEffect(() => {
    setOpen(new Array(listQuestion.length).fill(props.isShowAnswer))
  }, [props.isShowAnswer])
  // setOpen()
  const handleClick = (event, index) => {
    open[index] = !open[index]
    setOpen([...open]);
  };

  return (
    <List
      sx={{
        px: 2,
        width: "100%",
        // height: '100%',
        position: "relative",
        overflow: "auto",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {listQuestion.map((eachQuestion, index) => {
        return (
          <Box key={index} sx={{ boxShadow: 5, backgroundColor: "white" }}>
            <ListItem
              alignItems='flex-start'
              sx={{
                p: 1,
                height: 140,
                my: 2,
                bgcolor: "white",
                borderRadius: 0.5,
              }}
            >
              <ListItemAvatar sx={{ p: 0, m: 0, width: 170, height: "100%" }}>
                <Avatar
                  sx={{ width: "100%", height: "100%", borderRadius: 0.5 }}
                  alt="Image alt"
                  src={eachQuestion.img}
                  variant="square"
                />
              </ListItemAvatar>
              <Box sx={{ py: 1, px: 1, width: "100%", height: "100%" }}>
                <Stack sx={{ height: "calc(100% - 40px)" }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: 'grey',
                    }}>
                    {index + 1} .  {optionsQuestionType[eachQuestion.type].text}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, color: "black", fontWeight: "bold" }}
                    component="span"
                  >
                    {eachQuestion.text}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    width: " 100%",
                    height: 40,
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Stack spacing={1} direction='row' sx={{ width: '50%' }}>
                    <Chip key='chip1' label={eachQuestion.time + " seconds"} variant='outlined' size="small" color="info" sx={{ fontWeight: 'bold', fontSize: 14 }} />
                    <Chip key='chip2' label={optionsPoints[eachQuestion.points].text} variant='outlined' size="small" color="secondary" sx={{ fontWeight: 'bold', fontSize: 14 }} />
                  </Stack>
                  <Stack
                    textAlign="center"
                    direction="row-reverse"
                    spacing={1}
                    sx={{
                      width: "50%",
                      height: "100%",
                    }}
                  >
                    <Typography
                      onClick={(event) => handleClick(event, index)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 15,
                        cursor: 'pointer'
                      }}>
                      {t("List answers")}
                      {open[index] ? <ExpandLess /> : < ExpandMore />}
                    </Typography>
                  </Stack>
                </Box>
              </Box >
            </ListItem >
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ mx: 1 }}>
                {eachQuestion.ans.map((eachAns, i) => (
                  <Stack
                    key={'ans ' + i}
                    direction='row'
                    spacing={1}
                    alignItems="center"
                    sx={{
                      my: 0.5,
                      py: 2,
                      px: 1,
                      borderRadius: 1,
                      backgroundColor: answerUI2[i].bgColor,
                      boxShadow: 2,
                      width: "100%",
                      color: "white",
                    }}
                  >
                    {answerUI2[i].icon}
                    <Typography sx={{ flexGrow: 1, px: 1, fontSize: 18 }}>{eachAns.text}</Typography>
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
                ))
                }
              </List >
            </Collapse >
          </Box >
        );
      })}
    </List >
  );
}

const Details = () => {
  const { listRoom, curRoom, isError, isSuccess, isFetching, status } =
    useSelector(roomSelector);

  const roomID = useParams().roomID;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let isHaveRoom = false;

    listRoom.map((eachRoom, index) => {
      if (eachRoom._id === roomID) {
        isHaveRoom = true;
        dispatch(setInitCurRoom(index));
      }
    });

    if (!isHaveRoom) {
      dispatch(getRoomByID(roomID));
    }
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      navigate("/user/library");
    }

    if (isSuccess) {
      dispatch(clearState());
    }

    if (status === "delete") {
      navigate("/user/library");
    }
  }, [isError, isSuccess, status]);

  const userName = parseJwt(localStorage.kahut_app_accessToken).name;
  return (
    <Grid rowSpacing={2} columnSpacing={0} container my={1}
      sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100% - 78px)' }}
    >
      {curRoom && <DeleteDialog />}
      <Backdrop
        style={{ marginTop: "0px" }}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {curRoom && (
        <>
          <Grid item xs={4} sx={{ boxShadow: "3px 0 3px grey" }}>
            <Stack spacing={2} sx={{ px: 2, pb: 2 }}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "300px",
                }}
                src={curRoom.quizImage}
              />

              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                {curRoom.quizTitle}
              </Typography>
              <Stack spacing={1} direction="row" sx={{ mt: 3, width: "100%" }}>
                <Chip
                  label={curRoom.questions.length + " questions"}
                  variant="outlined"
                  size="medium"
                  color="info"
                  sx={{ px: 1, fontWeight: "bold", fontSize: 17 }}
                />
                <Chip
                  label={curRoom.plays + " plays"}
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  sx={{ px: 1, fontWeight: "bold", fontSize: 17 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexGrow: 1,
                  }}
                >
                  <Tooltip title="Edit this quiz" placement="top">
                    <IconButton
                      component={Link}
                      to={`/user/edit/${curRoom._id}`}
                      style={{ outline: 'none' }}
                      sx={{
                        mx: 0.5,
                        "&:hover": {
                          backgroundColor: "plum",
                        },
                      }}
                      edge="end"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Settings" placement="top">
                    <IconButton
                      style={{ outline: "none" }}
                      sx={{
                        mx: 0.5,
                        "&:hover": {
                          backgroundColor: "plum",
                        },
                      }}
                      edge="end"
                      aria-label="settings"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              <Divider />

              <Stack spacing={1} direction="row" sx={{ mt: 3 }}>
                <Button
                  startIcon={<PlayCircleOutlineIcon />}
                  style={{ outline: 'none', color: 'white', textTransform: 'none' }}
                  component={Link}
                  to={`/user/gameHost/${curRoom._id}`}
                  target="_blank"
                  variant="contained"
                  color="info"
                >
                  {t("Play")}
                </Button>
                <Button
                  startIcon={<EditIcon />}
                  style={{ outline: 'none', color: 'white', textTransform: 'none' }}
                  component={Link}
                  to={`/user/edit/${curRoom._id}`}
                  variant="contained"
                  color="warning"
                >
                  {t("Edit")}
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  style={{ outline: 'none', textTransform: 'none' }}
                  onClick={() => dispatch(setIsShowDeleteDialog(true))}
                  variant="contained"
                  color="error"
                >
                  {t("Delete")}
                </Button>
              </Stack>
              <Stack spacing={1} direction="row">
                <PersonOutlineIcon />
                <Typography>{t("A private kahut")}</Typography>
              </Stack>
              <Divider />
              <Stack spacing={2} direction='row'>
                {userName.split(' ').length > 1 ?
                  <Avatar {...stringAvatar(userName)} /> :
                  <Avatar sx={{ bgcolor: '#FF5722' }}>{userName.split(' ')[0][0]}</Avatar>
                }
                <Box>
                  <Typography>{userName}</Typography>
                  <Typography color="text.secondary"> {t("Updated 6 hours ago")}</Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid >
          <Grid item xs={8}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                px: 2,
                pt: 2,
              }}
            >
              <Box
                sx={{
                  width: "70%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    opacity: 0.8,
                    color: "#333333",
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  {"Questions (" + curRoom.questions.length + ")"}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={() => setIsShowAnswer(!isShowAnswer)}
                  style={{ outline: "none", textTransform: "none" }}
                  variant="contained"
                  color="secondary"
                >
                  {isShowAnswer ? 'Hide all anwer' : 'Show all answer'}
                </Button >
              </Box >
            </Box >
            <NestedList
              listQuestion={curRoom.questions}
              isShowAnswer={isShowAnswer}
            />
          </Grid >
        </>
      )}
    </Grid >
  );
};

export default Details;
