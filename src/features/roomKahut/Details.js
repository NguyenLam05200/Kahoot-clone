import {
  Chip,
  Box,
  Stack,
  Grid,
  Paper,
  Button,
  Typography,
  Divider,
  Tooltip,
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
} from "@mui/material";
import Navbar from "../user/Navbar";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import QuizIcon from "@mui/icons-material/Quiz";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import { parseJwt } from "../../utils/axios";

import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRoom,
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

const cssIcon = {
  color: "#18bd80",
  fontSize: 25,
  fontWeight: "bold",
};

const optionsQuestionType = [
  { text: "Quiz", icon: <QuizIcon sx={cssIcon} /> },
  {
    text: "True or False",
    icon: <PhonelinkEraseIcon sx={cssIcon} />,
  },
  { text: "Multi selections", icon: <DynamicFeedIcon sx={cssIcon} /> },
];

const optionsPoints = ["No points", "Standard points", "Double points"];

function NestedList(props) {
  const open = props.isShowAnswer;
  const listQuestion = props.listQuestion;

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
              alignItems="flex-start"
              key={index}
              sx={{
                p: 1,
                height: 120,
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
                      color: "grey",
                    }}
                  >
                    {index +
                      1 +
                      ". " +
                      optionsQuestionType[eachQuestion.type].text}
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
                  <Stack spacing={1} direction="row" sx={{ width: "50%" }}>
                    <Chip
                      label={eachQuestion.time + " seconds"}
                      variant="outlined"
                      size="small"
                      color="info"
                      sx={{ fontWeight: "bold", fontSize: 14 }}
                    />
                    <Chip
                      label={optionsPoints[eachQuestion.points]}
                      variant="outlined"
                      size="small"
                      color="secondary"
                      sx={{ fontWeight: "bold", fontSize: 14 }}
                    />
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                    >
                      {t("List answers")}
                      {open ? <ExpandMore /> : <ExpandLess />}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ mx: 1 }}>
                {eachQuestion.ans.map((eachAns, index) => (
                  <Stack
                    key={"ans " + index}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      my: 0.5,
                      py: 2,
                      px: 1,
                      borderRadius: 1,
                      backgroundColor: answerUI2[index].bgColor,
                      boxShadow: 2,
                      width: "100%",
                      color: "white",
                    }}
                  >
                    {answerUI2[index].icon}
                    <Typography sx={{ flexGrow: 1, px: 1, fontSize: 18 }}>
                      {eachAns.text}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {eachAns.isRight ? (
                        <DoneIcon
                          sx={{ fontSize: 28, color: "green", stroke: "green" }}
                        />
                      ) : (
                        <CloseIcon
                          sx={{ fontSize: 28, color: "red", stroke: "red" }}
                        />
                      )}
                    </Box>
                  </Stack>
                ))}
              </List>
            </Collapse>
          </Box>
        );
      })}
    </List>
  );
}

const Details = () => {
  const { listRoom, curRoom, isError, isSuccess, isFetching, status } =
    useSelector(roomSelector);

  const roomID = useParams().roomID;
  const navigate = useNavigate();

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

  return (
    <Grid
      rowSpacing={2}
      columnSpacing={0}
      container
      my={1}
      sx={{ backgroundColor: "#fafafa" }}
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
                      style={{ outline: "none" }}
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
                  style={{ outline: "none", color: "white" }}
                  component={Link}
                  to={`/user/gameHost/${curRoom._id}`}
                  target="_blank"
                  variant="contained"
                  color="info"
                >
                  {t("Play")}
                </Button>
                <Button
                  style={{ outline: "none", color: "white" }}
                  component={Link}
                  to={`/user/edit/${curRoom._id}`}
                  variant="contained"
                  color="warning"
                >
                  {t("Edit")}
                </Button>
                <Button
                  style={{ outline: "none" }}
                  onClick={() => dispatch(setIsShowDeleteDialog(true))}
                  variant="contained"
                  color="error"
                >
                  {t("Delete")}
                </Button>
              </Stack>
              <Stack spacing={1} direction="row">
                <PersonOutlineIcon />
                <Typography>{t("A private kahut")}}</Typography>
              </Stack>
              <Divider />

              <Stack spacing={2} direction="row">
                <Avatar
                  alt="Cindy Baker"
                  src="https://lh3.googleusercontent.com/pw/AM-JKLU1gx79R5oazQQnu0gGe0bzEFnKdSltimeJHOKpScR3hB0qIloTbwe4Ou2ygtKEP_SDr-LZgg3HeK3_a_J-Kzim-99-xqyP9vfAt_Ai9pYz5JfRCx0IOMNNMXlG0eijUCn-I8ZJFq_Gu5v7E93F5K9G=w876-h657-no"
                />
                <Box>
                  <Typography>
                    {parseJwt(localStorage.kahut_app_accessToken).name}
                  </Typography>
                  <Typography color="text.secondary">
                    {t("Updated 6 hours ago")}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>
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
                  {isShowAnswer ? "Hide anwer" : "Show answer"}
                </Button>
              </Box>
            </Box>
            <NestedList
              listQuestion={curRoom.questions}
              isShowAnswer={isShowAnswer}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Details;
