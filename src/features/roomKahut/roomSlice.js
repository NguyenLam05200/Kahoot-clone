import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  formatInputCreate,
  handleCreate,
  handleGetAllRoom,
  handleGetRoomByID,
  handleDeleteRoomByID,
  handleUpdate,
  formatInputUpdate,
  handleGetAllReport,
  handleGetReportByID
} from './roomAPI';


export const createNewRoom = createAsyncThunk(
  'room/createNewRoom',
  async (dataInput, thunkAPI) => {
    try {
      let newKahutRoom = await formatInputCreate(dataInput);
      const response = await handleCreate(newKahutRoom);

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

export const getAllRoom = createAsyncThunk(
  'room/getAllRoom',
  async (thunkAPI) => {
    try {
      const response = await handleGetAllRoom();
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



export const updateRoomByID = createAsyncThunk(
  'room/updateRoomByID',
  async (dataInput, thunkAPI) => {
    try {
      const updatedRoom = await formatInputUpdate(dataInput);
      const response = await handleUpdate(updatedRoom);
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


export const getAllReport = createAsyncThunk(
  'room/getAllReport',
  async (thunkAPI) => {
    try {
      const response = await handleGetAllReport();
      if (response.status === 200) {
        return response.data.reports;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getReportByID = createAsyncThunk(
  'room/getReportByID',
  async (reportID, thunkAPI) => {
    try {
      const response = await handleGetReportByID(reportID);
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



export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    status: 'idle',
    listRoom: [],
    listReport: [],
    curRoom: null,
    curReport: null,
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
    logout: (state) => {
      state.listRoom = [];
      state.listReport = [];
      state.curRoom = null;
      state.curReport = null;
      state.status = 'idle';
      state.isShowDeleteDialog = false;
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    setIsShowDeleteDialog: (state, { payload }) => {
      state.isShowDeleteDialog = payload;
    },
    setInitCurRoom: (state, { payload }) => {
      state.curRoom = state.listRoom[payload]
    },
    setInitCurReport: (state, { payload }) => {
      state.curReport = state.listReport[payload]
    },
  },
  extraReducers: {
    [createNewRoom.fulfilled]: (state, { payload }) => {
      state.listRoom = [];
      state.status = 'create';
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
    [getAllReport.fulfilled]: (state, { payload }) => {
      state.listReport = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getAllReport.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllReport.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [getReportByID.fulfilled]: (state, { payload }) => {
      state.curReport = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getReportByID.pending]: (state) => {
      state.isFetching = true;
    },
    [getReportByID.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
  },
});

export const { clearState, logout, setIsShowDeleteDialog, setInitCurRoom, setInitCurReport } = roomSlice.actions;

export const roomSelector = (state) => state.room;

export default roomSlice.reducer;
