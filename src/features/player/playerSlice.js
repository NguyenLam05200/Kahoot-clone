import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handlePIN, handleNAME } from './playerAPI';

export const enterPIN = createAsyncThunk(
  'players/enterPIN',
  async (inputPin, thunkAPI) => {
    try {
      console.log(inputPin);
      let res = await handlePIN(inputPin);
      if (res) {
        return inputPin;
      } else {
        return thunkAPI.rejectWithValue("Your pin is incorrect!");
      }
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
  },
  extraReducers: {
    [enterPIN.fulfilled]: (state) => {
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

export const { clearState } = playerSlice.actions;

export const playerSelector = (state) => state.player;

export default playerSlice.reducer;
