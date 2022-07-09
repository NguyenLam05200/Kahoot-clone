import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleLoginApi, handleRegisterApi } from './userAPI';
import { parseJwt } from '../../utils/axios';

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
      const response = await handleLoginApi(dataInput);
      if (response.status === 200) {
        localStorage.setItem("kahut_app_accessToken", response.data.token);
        return true;
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
    logout: (state) => {
      delete localStorage.kahut_app_accessToken;
      state.user = null;
    },
    update: (state, {payload}) => {
      state.user = payload;
    }
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

export const { clearState, logout, update } = userSlice.actions;

export const userSelector = (state) => state.user; 

export default userSlice.reducer;
