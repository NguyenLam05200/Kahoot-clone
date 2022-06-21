import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/UserSlice';
import playerReducer from '../features/player/playerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    player: playerReducer,
  },
});
