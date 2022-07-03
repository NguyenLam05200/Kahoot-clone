import { createSlice } from '@reduxjs/toolkit';
import socket from '../../utils/socket';
import { requestFullScreen } from '../../utils/utilities';

const initialState = {
  status: 'idle',
  listQuestions: [
    {
      type: "Quiz",
      img: "https://images.unsplash.com/photo-1569504275728-9350b4c55fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1027&q=80",
      time: 10,
      ques_title: "Con gà có trước hay quả trứng có trước?",
      ans: ['Con gà trước', 'Quả trứng trước', 'Cả 2 cùng lúc', 'Bó tay .com'],
      correctAns: [1],
    },
    {
      type: "Quiz",
      img: "https://images.unsplash.com/photo-1586343061001-b61e47c9b7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      time: 10,
      ques_title: "Bao lâu bán đuợc 1 tỉ gói mè 😐?",
      ans: ['1 tỉ năm', 'Mùa quýt năm sau', '2 triệu năm Đen Vâu', 'a thousand years - Christina Perri'],
      correctAns: [1],
    },
    {
      type: "Multi selections",
      img: "https://hocluat.vn/wp-content/uploads/2017/06/cac-nuoc-xa-hoi-chu-nghia.jpg",
      time: 10,
      ques_title: "Những nước Xã hội chủ nghĩa là:",
      ans: ['Việt Nam', 'Anh', 'Lào', 'Trung Quốc', 'Cuba', 'Nga'],
      correctAns: [0, 2, 3, 4],
    },
    {
      type: "True or False",
      img: "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      time: 10,
      ques_title: "Làm nguời yêu nhé em 💜🧡💚💛🤍",
      ans: ['Hong bé ơi', 'Friend zones forever 🍇🍉🍍🥭🍏🍐🍒🍓🍅'],
      correctAns: [0, 1],
    },
    {
      type: "Quiz",
      img: "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      time: 20,
      ques_title: "Nên yêu bao nhiêu người một lúc 😏",
      ans: ['1 🙎', '2 🙎🙎', '3 🙎🙎🙎', 'Bao nhiêu cũng được, miễn là thật lòng 👌'],
      correctAns: [0],
    },
  ],
  pin: null,
  listPlayers: [],
  curQuestion: 0,
  timeReadQuestion: 0,
  countAnswer: 0,
  countEachAns: [0, 0, 0, 0],
  scoreBoard: [],
  isSkip: false,
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
      state.listPlayers = [];
      state.status = 'startGame';
    },
    readQuestion: (state, { payload }) => {
      state.timeReadQuestion = payload.timeReadQuestion;
      state.curQuestion = payload.indexQuestion;
      state.countAnswer = 0;
      state.countEachAns = new Array(state.listQuestions[state.curQuestion].ans.length).fill(0);
      state.isSkip = false;
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
      socket.emit('SHOW_RESULT');
      state.status = 'showResult';
    },
    sendAnswer: (state, { payload }) => {
      state.countAnswer += 1;
      state.countEachAns = state.countEachAns.map((eachAns, index) => {
        if (payload.includes(index)) {
          eachAns += 1;
        }
        return eachAns;
      })
    },
    skip: (state) => {
      socket.emit('SKIP');
      state.countEachAns = new Array(state.listQuestions[state.curQuestion].ans.length).fill(0);
      state.isSkip = true;
      state.status = 'showResult';
    },
    requestScoreboard: (state) => {
      state.isSkip ? state.status = 'scoreBoard' : socket.emit('SCORE_BOARD')
    },
    getScoreBoard: (state, { payload }) => {
      state.scoreBoard = payload;
      state.status = 'scoreBoard';
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
  showResult,
  sendAnswer,
  getScoreBoard,
  requestScoreboard,
  skip
} = gameSlice.actions;

export const gameSelector = (state) => state.game;

export default gameSlice.reducer;
