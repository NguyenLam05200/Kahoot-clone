import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatInputCreate, handleCreate, handleGetAll, handleGetRoomByID, handleDeleteRoomByID } from './roomAPI';
import axios from 'axios';


export const createNewRoom = createAsyncThunk(
  'room/createNewRoom',
  async (dataInput, thunkAPI) => {
    try {
      let newKahutRoom = await formatInputCreate(dataInput);
      const response = await handleCreate(newKahutRoom);

      if (response.status === 200) {
        // newKahutRoom.id = response.data.id
        return true;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.log('error catch: ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllRoom = createAsyncThunk(
  'room/getAllRoom',
  async (thunkAPI) => {
    console.log('here');
    try {
      const response = await handleGetAll();
      if (response.status === 200) {
        return response.data.quizzes;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getRoomByID = createAsyncThunk(
  'room/getRoomByID',
  async (roomID, thunkAPI) => {
    try {
      const response = await handleGetRoomByID(roomID);
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

export const deleteRoomByID = createAsyncThunk(
  'room/deleteRoomByID',
  async (roomID, thunkAPI) => {
    try {
      const response = await handleDeleteRoomByID(roomID);
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


export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    status: 'idle',
    listRoom: [],
    indexCurRoom: null,
    isShowDeleteDialog: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.status = 'idle';
      state.isShowDeleteDialog = false;
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    setIsShowDeleteDialog: (state, { payload }) => {
      state.isShowDeleteDialog = payload;
    },
    setCurRoom: (state, { payload }) => {
      state.indexCurRoom = payload
    }
  },
  extraReducers: {
    [createNewRoom.fulfilled]: (state, { payload }) => {
      // state.listRoom = [...state.listRoom, payload];
      state.isFetching = false;
      state.isSuccess = true;
    },
    [createNewRoom.pending]: (state) => {
      state.isFetching = true;
    },
    [createNewRoom.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [getAllRoom.fulfilled]: (state, { payload }) => {
      state.listRoom = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getAllRoom.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllRoom.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [getRoomByID.fulfilled]: (state, { payload }) => {
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
    [deleteRoomByID.fulfilled]: (state, { payload }) => {
      state.curRoom = null;
      state.status = 'delete';
      state.isFetching = false;
      state.isSuccess = true;
    },
    [deleteRoomByID.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteRoomByID.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
  },
});

export const { clearState, setIsShowDeleteDialog, setCurRoom } = roomSlice.actions;

export const roomSelector = (state) => state.room;

export default roomSlice.reducer;
