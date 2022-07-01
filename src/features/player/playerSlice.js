import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handlePIN, handleNAME } from './playerAPI';
import Socket from '../../utils/socket';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const enterPIN = createAsyncThunk(
  'players/enterPIN',
  async (inputPin, thunkAPI) => {
    try {
      Socket.emit('ENTER_PIN', inputPin)

      Socket.on('ENTER_PIN', (msg) => {
        if (msg) { return msg } else {
          return thunkAPI.rejectWithValue("Your pin is incorrect!");
        }
      });

    } catch (e) {
      return thunkAPI.rejectWithValue("Connect to server failed!");
    }
  }
);

export const enterName = createAsyncThunk(
  'players/enterName',
  async (inputName, thunkAPI) => {
    try {
      let res = await handleNAME(inputName);
      if (res) {
        return inputName;
      } else {
        return thunkAPI.rejectWithValue("Your pin is incorrect!");
      }
    } catch (e) {
      return thunkAPI.rejectWithValue("Connect to server failed!");
    }
  }
);

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    name: '',
    questions: [],
    score: 0,
    curQuestion: 0,
    timeReadQuestion: 0,
    point: 0,
    status: 'idle',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    sendPin: (state, { payload }) => {
      Socket.emit('ENTER_PIN', payload)
      state.isFetching = true;
    },
    sendPinResult: (state, { payload }) => {
      console.log('send pin result: ', payload);
      state.isFetching = false;
      if (payload.isRightPin) {
        state.questions = payload.listQuestions;
        state.isSuccess = true;
        state.status = 'rightPin';
      } else {
        state.isError = true;
        state.errorMessage = payload.errMsg;
      }
    },
    sendName: (state, { payload }) => {
      Socket.emit('ENTER_NAME', payload)
      state.score = 0;
      state.name = payload;
      state.status = 'rightName';
    },
    ready: (state) => {
      state.status = 'getReady';
      return state;
    },
    readQuestion: (state, { payload }) => {
      state.timeReadQuestion = payload.timeReadQuestion;
      state.curQuestion = payload.indexQuestion;
      state.status = 'readQuestion';
      return state;
    },
    chooseAnswer: (state) => {
      state.status = 'chooseAnswer';
      return state;
    },
    waitResult: (state) => {
      state.status = 'waitResult';
      return state;
    },
    timeUp: (state) => {
      state.status = 'timeUp';
      return state;
    },
    incorrectAns: (state) => {
      state.status = 'incorrectAns';
      return state;
    },
    correctAns: (state, { payload }) => {
      state.status = 'correctAns';
      state.point = payload;
      state.score += payload / 2;
      return state;
    },
  },
  extraReducers: {
    [enterPIN.fulfilled]: (state, { payload }) => {
      console.log('payload: ', payload);
      state.questions = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.status = 'rightPin';
    },
    [enterPIN.pending]: (state) => {
      state.isFetching = true;
    },
    [enterPIN.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [enterName.fulfilled]: (state, { payload }) => {
      state.name = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.status = 'rightName'
    },
    [enterName.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [enterName.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState, sendPin, sendPinResult, sendName, ready, readQuestion, chooseAnswer, waitResult, timeUp, incorrectAns, correctAns } = playerSlice.actions;

export const playerSelector = (state) => state.player;

export default playerSlice.reducer;
