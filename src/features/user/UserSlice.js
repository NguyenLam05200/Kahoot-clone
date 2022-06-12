import { useRadioGroup } from '@mui/material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance, parseJwt } from '../../utils/axios';
import { handleLoginApi, handleRegisterApi } from './userAPI';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async (_data, thunkAPI) => {
    try {
      let response = await handleRegisterApi(_data);
      const data = response.data;
      console.log('data', data);
      if (data && data.errCode !== 0) {
        console.log('Error 1');
        return thunkAPI.rejectWithValue(data);
      } else if (data && data.errCode === 0) {
        // console.log(data.user)
        localStorage.kahut_app_accessToken = true;
        return data;
      }

      // if (response.status === 200) {
      //   // localStorage.setItem('token', data.token);
      //   // return { ...data, username: name, email: email };
      // } else {
      //   return thunkAPI.rejectWithValue(data);
      // }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ username, password }, thunkAPI) => {
    try {
      let res = await handleLoginApi(username, password);
      const data = res.data;
      if (data && data.errCode !== 0) {
        console.log('Error 1');

        return thunkAPI.rejectWithValue(data);
      } else if (data && data.errCode === 0) {
        // console.log(data.user)
        localStorage.kahut_app_accessToken = true;
        return data.user;
      }
      // console.log(_data)
      // console.log('Herew');
      // const response = await instance.post('/auth', _data);
      // console.log('res: ', response);
      // let data = await response.data;
      // console.log("data: ", data)
      // if (data.authenticated) {
      //   localStorage.kahut_app_accessToken = response.data.accessToken;
      //   const obj = parseJwt(response.data.accessToken);
      //   localStorage.kahut_app_userId = obj.userId;
      //   return data;
      // } else {
      //   console.log('Error 1');

      //   return thunkAPI.rejectWithValue(data);
      // }


      // const response = await fetch(
      //   'https://mock-user-auth-server.herokuapp.com/api/v1/auth',
      //   {
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       email,
      //       password,
      //     }),
      //   }
      // );
      // let data = await response.json();
      // console.log('response', data);
      // if (response.status === 200) {
      //   localStorage.setItem('token', data.token);
      //   return data;
      // } else {
      //   return thunkAPI.rejectWithValue(data);
      // }
    } catch (e) {
      console.log('Error 2', e);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://mock-user-auth-server.herokuapp.com/api/v1/users',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await response.json();
      console.log('data', data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
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
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.user.email;
      state.username = payload.user.name;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.errMessage;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.email = payload.email;
      state.username = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log('payload', payload.message);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.email;
      state.username = payload.name;
    },
    [fetchUserBytoken.rejected]: (state) => {
      console.log('fetchUserBytoken');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
