import { createSlice } from '@reduxjs/toolkit';
import socket from '../../utils/socket';
import { requestFullScreen } from '../../utils/utilities';

const initialState = {
  status: 'idle',
  listQuestions: [
    {
      type: "Quiz",
      img: "https://images.unsplash.com/photo-1569504275728-9350b4c55fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1027&q=80",
      time: 15,
      ques_title: "Con gà có trước hay trứng gà có trước?",
      ans: ['Con gà trước', 'Quả trứng trước', 'Cả 2 cùng lúc', 'Bó tay .com'],
      correctAns: [3],
    },
    {
      type: "Quiz",
      img: "https://images.unsplash.com/photo-1586343061001-b61e47c9b7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      time: 20,
      ques_title: "Bao lâu bán đuợc 1 tỉ gói mè 😐?",
      ans: ['1 tỉ năm', 'Mùa quýt năm sau', '2 triệu năm Đen Vâu', 'a thousand years - Christina Perri'],
      correctAns: [1],
    },
    {
      type: "True or False",
      img: "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      time: 20,
      ques_title: "Làm nguời yêu nhé em 💜🧡💚💛🤍",
      ans: ['Hong bé ơi', 'Friend zones forever 🍇🍉🍍🥭🍏🍐🍒🍓🍅'],
      correctAns: [0, 1],
    },
  ],
  pin: null,
  listPlayers: [],
  curQuestion: 0,
  timeReadQuestion: 0,
  isBlockJoin: false,
  isFullScreen: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    setStateLoadingPin: (state) => {
      state.status = 'loadingPin';
    },
    getPinSuccess: (state, { payload }) => {
      state.status = 'waitPlayers';
      state.pin = payload;
    },
    joinPlayer: (state, { payload }) => {
      state.listPlayers = [...state.listPlayers, payload]
    },
    leavePlayer: (state, { payload }) => {
      state.listPlayers = state.listPlayers.filter(function (eachPlayer, index, arr) {
        return eachPlayer.id !== payload;
      });
    },
    setBlockJoin: (state) => {
      socket.emit('BLOCK_JOIN');
      state.isBlockJoin = !state.isBlockJoin;
    },
    startGame: (state) => {
      socket.emit('START_GAME');
      state.status = 'startGame';
    },
    readQuestion: (state, { payload }) => {
      state.timeReadQuestion = payload.timeReadQuestion;
      state.curQuestion = payload.indexQuestion;
      state.status = 'readQuestion';
    },
    setFullScreen: (state) => {
      requestFullScreen();
      state.isFullScreen = !state.isFullScreen
    },
    chooseAnswer: (state) => {
      state.status = 'chooseAnswer';
    },
    showResult: (state) => {
      state.status = 'showResult';
    },
  },
});

export const {
  clearState,
  setSocket,
  setStateLoadingPin,
  getPinSuccess,
  joinPlayer,
  leavePlayer,
  setBlockJoin,
  startGame,
  readQuestion,
  setFullScreen,
  chooseAnswer,
  showResult
} = gameSlice.actions;

export const gameSelector = (state) => state.game;

export default gameSlice.reducer;
