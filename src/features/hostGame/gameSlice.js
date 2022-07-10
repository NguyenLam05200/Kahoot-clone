import { createSlice } from '@reduxjs/toolkit';
import socket from '../../utils/socket';
import { requestFullScreen } from '../../utils/utilities';
import { playSound, changeVolume } from './sound/sound';

const initialState = {
  status: 'idle',
  listQuestions: [
    {
      type: "Quiz",
      img: "https://images.unsplash.com/photo-1569504275728-9350b4c55fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1027&q=80",
      time: 10,
      text: "Con gà có trước hay quả trứng có trước?",
      ans: ['Con gà trước', 'Quả trứng trước', 'Cả 2 cùng lúc', 'Bó tay .com'],
      correctAns: [1],
    },
    {
      type: "Quiz",
      img: "https://images.unsplash.com/photo-1586343061001-b61e47c9b7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      time: 10,
      text: "Bao lâu bán đuợc 1 tỉ gói mè 😐?",
      ans: ['1 tỉ năm', 'Mùa quýt năm sau', '2 triệu năm Đen Vâu', 'a thousand years - Christina Perri'],
      correctAns: [1],
    },
    {
      type: "Multi selections",
      img: "https://hocluat.vn/wp-content/uploads/2017/06/cac-nuoc-xa-hoi-chu-nghia.jpg",
      time: 10,
      text: "Những nước Xã hội chủ nghĩa là:",
      ans: ['Việt Nam', 'Anh', 'Lào', 'Trung Quốc', 'Cuba', 'Nga'],
      correctAns: [0, 2, 3, 4],
    },
    // {
    //   type: "True or False",
    //   img: "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    //   time: 10,
    //   text: "Làm nguời yêu nhé em 💜🧡💚💛🤍",
    //   ans: ['Hong bé ơi', 'Friend zones forever 🍉🍍🍏🍓'],
    //   correctAns: [0],
    // },
    {
      type: "Quiz",
      img: "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      time: 20,
      text: "Nên yêu bao nhiêu người một lúc 😏",
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
  percentRightTotal: null,
  reportData: [],
  volume: 0.5,
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
      state.status = 'idle';
      state.isFullScreen = 'false';
      state.listPlayers = [];
      state.pin = null;
      state.curQuestion = 0;
      state.scoreBoard = [];
      state.isSkip = false;
      state.isBlockJoin = false;
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    setStateLoadingPin: (state) => {
      state.status = 'loadingPin';
    },
    getPinSuccess: (state, { payload }) => {
      state.status = 'waitPlayers';
      const pinStr = payload + '';
      state.pin = pinStr.slice(0, 3) + ' ' + pinStr.slice(3, 6);
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
      playSound(0)
      socket.emit('START_GAME');
      state.status = 'startGame';
    },
    readQuestion: (state, { payload }) => {
      playSound(4)
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
      playSound(3)
      state.status = 'chooseAnswer';
    },
    showResult: (state) => {
      playSound(1)
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
      playSound(1)
      state.status = 'showResult';
    },
    requestScoreboard: (state) => {
      playSound(2)
      state.isSkip && state.curQuestion < state.listQuestions.length - 1 ? state.status = 'scoreBoard' : socket.emit('SCORE_BOARD')
    },
    getScoreBoard: (state, { payload }) => {
      state.scoreBoard = payload;
      state.status = 'scoreBoard';
    },
    prepareSumary: (state, { payload }) => {
      state.percentRightTotal = payload.percentRightTotal;
      state.scoreBoard = payload.rating;
      state.reportData = payload.reportData;
      state.status = 'prepareSumary';
    },
    sumary: (state) => {
      socket.emit('SUMARY');

      playSound(5)
      state.status = 'sumary';
    },
    report: (state) => {
      playSound(-1)
      state.status = 'report';
    },
    playAgain: (state) => {
      socket.emit('PLAY_AGAIN')
      state.curQuestion = 0;
      state.scoreBoard = [];
      state.isSkip = false;
      state.isBlockJoin = false;
      state.isFullScreen = false;
      state.status = 'waitPlayers'
    },
    setVolume: (state, { payload }) => {
      changeVolume(payload);
      state.volume = payload;
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
  skip,
  prepareSumary,
  sumary,
  report,
  playAgain,
  setVolume
} = gameSlice.actions;

export const gameSelector = (state) => state.game;

export default gameSlice.reducer;
