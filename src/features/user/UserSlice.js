import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleLoginApi, handleRegisterApi } from './userAPI';
import axios from 'axios'

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async (_data, thunkAPI) => {
    try {
      let response = await handleRegisterApi({
        email: _data.email,
        password: _data.password,
        name: _data.lastName + " " + _data.firstName,
      });
      if (response.status === 200) {
        return true;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const baseURL = 'http://157.245.147.239:8080/v1/user/'
export const loginUser = createAsyncThunk(
  'users/login',
  async ({ username, password }, thunkAPI) => {
    // axios
    //   .post(`${baseURL}/authenticate`, {
    //     title: "Hello World!",
    //     body: { username, password }
    //   })
    //   .then((response) => {
    //     console.log('data res: ', response);
    //   }).catch(error => {
    //     console.log('error catch: ', error);
    //   });
    try {
      //const response = await fetch(`url`); //where you want to fetch data
      //Your Axios code part.
      const response = await axios.post(`${baseURL}/authenticate`, {
        username, password
      })//where you want to fetch data
      // return await response.json();
      console.log('res: ', response);
    } catch (error) {
      console.log('error catch: ', error);
      // return thunkAPI.rejectWithValue({ error: error.message });
    }

    // try {
    //   console.log('data input: ', username, password);
    //   let response = await handleLoginApi(username, password);
    //   console.log('res: ', response);
    //   if (response.status === 200) {
    //     //localStorage.kahut_app_accessToken = response.data.token;
    //     localStorage.setItem("kahut_app_accessToken",response.data.token );
    //     return true;
    //   } else {
    //     return thunkAPI.rejectWithValue(response.data);
    //   }
    // } catch (e) {
    //   console.log('Error 2', e);
    //   return thunkAPI.rejectWithValue(e.response.data);
    // }
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
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
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

export default userSlice.reducer;
