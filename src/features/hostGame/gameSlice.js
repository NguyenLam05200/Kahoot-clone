import { createSlice } from '@reduxjs/toolkit';
import socket from '../../utils/socket';

const initialState = {
  status: 'idle',
  listQuestions: [
    {
      type: "Choose correct answers",
      img: "https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg",
      time: 15,
      ques_title: "Con gà có truớc hay trứng gà có truớc?",
      ans: ['Con gà trước', 'Quả trứng trước', 'Cả 2 cùng lúc', 'Bó tay .com'],
      correctAns: [3],
    },
    {
      type: "Choose correct answers",
      img: "https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg",
      time: 20,
      ques_title: "Bao lâu bán đuợc 1 tỉ gói mè 😐?",
      ans: ['1 tỉ năm', 'Mùa quýt năm sau', '2 triệu năm Đen Vâu', 'a thousand years - Christina Perri'],
      correctAns: [1],
    },
    {
      type: "True or False",
      img: "https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg",
      time: 20,
      ques_title: "Làm nguời yêu nhé em 💜🧡💚💛🤍",
      ans: ['Hong bé ơi', 'Friend zones forever'],
      correctAns: [0, 1],
    },
  ],
  pin: null,
  listPlayers: [],
  isBlockJoin: false,
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
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    setStateLoadingPin: (state) => {
      state.status = 'loadingPin';
    },
    getPinSuccess: (state, { payload }) => {
      state.status = 'waitPlayers';
      state.pin = payload;
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
  },
});

export const {
  clearState,
  setSocket,
  setStateLoadingPin,
  getPinSuccess,
  joinPlayer,
  leavePlayer,
  setBlockJoin,
} = gameSlice.actions;

export const gameSelector = (state) => state.game;

export default gameSlice.reducer;
