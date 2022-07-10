import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleLoginApi, handleRegisterApi } from './userAPI';
import { parseJwt } from '../../utils/axios';
import { instanceAuth } from '../../utils/axios';
import axios from 'axios';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async (dataInput, thunkAPI) => {
    try {
      const response = await handleRegisterApi(dataInput);
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

export const loginUser = createAsyncThunk(
  'users/login',
  async (dataInput, thunkAPI) => {
    try {
      const response = await instanceAuth.post(`authenticate`, dataInput)
      if (response.status === 200) {
        localStorage.setItem("kahut_app_accessToken", response.data.token);
        console.log('response parse: ', parseJwt(response.data.token));
        return parseJwt(response.data.token);
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
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
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log('payload: ', payload);
      state.user = { email: payload.email, name: payload.name };
      state.isFetching = false;
      state.isSuccess = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;
