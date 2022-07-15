import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatInputCreate, handleCreate, handleGetAll, handleGetRoomByID, handleDeleteRoomByID, handleUpdate, formatInputUpdate } from './roomAPI';
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllRoom = createAsyncThunk(
  'room/getAllRoom',
  async (thunkAPI) => {
    console.log('call api get all room');
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
    console.log('call api get room by id');
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


export const updateRoomByID = createAsyncThunk(
  'room/updateRoomByID',
  async (dataInput, thunkAPI) => {
    try {
      const updatedRoom = await formatInputUpdate(dataInput);
      const response = await handleUpdate(updatedRoom);
      console.log('response: ', response);
      if (response.status === 200) {
        return updatedRoom;
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
      console.log('response: ', response);
      if (response.status === 200) {
        return roomID;
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
    curRoom: null,
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
    setInitCurRoom: (state, { payload }) => {
      state.curRoom = state.listRoom[payload]
    },
    setCurRoom: (state, { payload }) => {
      state.curRoom = payload
    }
  },
  extraReducers: {
    [createNewRoom.fulfilled]: (state, { payload }) => {
      state.listRoom = [];
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
      state.listRoom = state.listRoom.filter(eachRoom => {
        return eachRoom._id !== payload;
      })
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
    [updateRoomByID.fulfilled]: (state, { payload }) => {
      state.curRoom = null;
      state.listRoom = [];
      state.status = 'edit';
      state.isFetching = false;
      state.isSuccess = true;
    },
    [updateRoomByID.pending]: (state) => {
      state.isFetching = true;
    },
    [updateRoomByID.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
  },
});

export const { clearState, setIsShowDeleteDialog, setInitCurRoom, setCurRoom } = roomSlice.actions;

export const roomSelector = (state) => state.room;

export default roomSlice.reducer;
