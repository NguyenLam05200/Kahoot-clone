import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/UserSlice';
import playerReducer from '../features/player/playerSlice';
import gameReducer from '../features/hostGame/gameSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    player: playerReducer,
    game: gameReducer,
  },
});
