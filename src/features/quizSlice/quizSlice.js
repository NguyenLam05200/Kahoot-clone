import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../utils/axios";

export const fetchQuiz = createAsyncThunk(
  "quiz/getListQuiz",
  async (roomID, thunkAPI) => {
    axios
      .get(`http://157.245.147.239:9090/v1/api/admin/quiz/${roomID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('kahut_app_accessToken')}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        // return res.data;
      })
      .catch((error) => console.log(error));
  }
);

export const addNewQuiz = createAsyncThunk(
  "quiz/addNewQuiz",
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost, roomID) => {
    // We send the initial data to the fake API server
    const response = await instance.post(`/quiz/${roomID}`, initialPost);
    // The response includes the complete post object, including unique ID
    return response.data;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuiz.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.quiz = action.payload;
        console.log(state.quiz);
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewQuiz.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.quiz.push(action.payload);
      });
  },
});

//export const { loadQuiz, addQuiz } = quizSlice.actions;
export const selectAllQuiz = (state) => state.quiz;
export default quizSlice.reducer;
