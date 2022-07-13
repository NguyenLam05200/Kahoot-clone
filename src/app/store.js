import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import playerReducer from '../features/player/playerSlice';
import gameReducer from '../features/hostGame/gameSlice';
import quizReducer from "../features/quizSlice/quizSlice";
import roomReducer from "../features/roomKahut/roomSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    player: playerReducer,
    game: gameReducer,
    quiz: quizReducer,
    room: roomReducer,
  },
});
