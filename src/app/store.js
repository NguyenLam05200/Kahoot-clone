import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import playerReducer from '../features/player/playerSlice';
import gameReducer from '../features/hostGame/gameSlice';
import roomReducer from "../features/roomKahut/roomSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
    game: gameReducer,
    room: roomReducer,
  },
});
