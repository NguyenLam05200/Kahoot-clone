import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import socket from '../../utils/socket';
import { requestFullScreen } from '../../utils/utilities';
import { playSound, changeVolume } from './sound/sound';
import { handleGetRoomByID, handleAddNewReport, handlePlayQuiz } from '../roomKahut/roomAPI';

export const getRoomByID = createAsyncThunk(
  'gameHost/getRoomByID',
  async (roomID, thunkAPI) => {
    try {
      const response = await handleGetRoomByID(roomID);
      response.data.questions.map(eachQuestion => {
        if (eachQuestion.type === 0) {
          return eachQuestion.type = 'Quiz';
        } else if (eachQuestion.type === 1) {
          return eachQuestion.type = 'True or False'
        } else if (eachQuestion.type === 2) {
          return eachQuestion.type = 'Multi selections'
        } else {
          return eachQuestion.type = 'Quiz';
        }
      })

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addNewReport = createAsyncThunk(
  'gameHost/addNewReport',
  async (newReport, thunkAPI) => {
    try {
      const response = await handleAddNewReport(newReport);
      if (response.status === 200) {
        return response.data.id;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const playQuiz = createAsyncThunk(
  'gameHost/playQuiz',
  async (roomID, thunkAPI) => {
    try {
      const response = await handlePlayQuiz(roomID);
      if (response.status === 200) {
        return true;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  status: 'idle',
  curRoom: null,
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
  reportID: '',
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
      state.reportID = '';
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
      state.countEachAns = new Array(state.curRoom.questions[state.curQuestion].ans.length).fill(0);
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
      state.countEachAns = new Array(state.curRoom.questions[state.curQuestion].ans.length).fill(0);
      state.isSkip = true;
      playSound(1)
      state.status = 'showResult';
    },
    requestScoreboard: (state) => {
      playSound(2)
      state.isSkip && state.curQuestion < state.curRoom.questions.length - 1 ? state.status = 'scoreBoard' : socket.emit('SCORE_BOARD')
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
  extraReducers: {
    [getRoomByID.fulfilled]: (state, { payload }) => {
      socket.emit('CREATE_PIN', payload.questions)
      state.status = 'loadingPin';
      state.curRoom = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getRoomByID.pending]: (state) => {
      state.isFetching = true;
    },
    [getRoomByID.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [addNewReport.fulfilled]: (state, { payload }) => {
      state.reportID = payload
      state.isFetching = false;
      state.isSuccess = true;
    },
    [addNewReport.pending]: (state) => {
      state.isFetching = true;
    },
    [addNewReport.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [playQuiz.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [playQuiz.pending]: (state) => {
      state.isFetching = true;
    },
    [playQuiz.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
  }
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
