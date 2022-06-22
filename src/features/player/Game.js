import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { TextField, Box, Stack, Grid, Paper, Divider, Typography, Container, Button } from '@mui/material'
import { purple } from '@mui/material/colors';

import { useSelector } from "react-redux";
import { playerSelector } from './playerSlice';
import RightName from "./RightName";
import StartGame from "./StartGame";
const Game = ({ }) => {
  const { status, name, questions, score } = useSelector(
    playerSelector
  );
  const colorBg = '#46178F';
  const colorText = purple[0];

  return (
    <>
      {status === 'rightName' && <StartGame />}
      {status === 'startGame' && <StartGame />}
    </>
  );
};

export default Game;
