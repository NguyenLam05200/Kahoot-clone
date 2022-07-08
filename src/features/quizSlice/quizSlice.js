import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../utils/axios";

export const fetchQuiz = createAsyncThunk(
  "quiz/getListQuiz",
  async (roomID, thunkAPI) => {
    const Token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imh1eWRvYW5AZ21haWwuY29tIiwidGVzdF9maWVsZCI6InRlc3QiLCJleHRyYSI6e30sInNjb3BlIjpbInNjb3BlLmFkbWluIl0sImlhdCI6MTY1NzMwMDY2NiwiZXhwIjoxNjU3MzA0MjY2LCJzdWIiOiJodXlkb2FuQGdtYWlsLmNvbSJ9.PR-Fjh26rsFbFZ9vysP9PKwiyR_PeFGq7pmbtFvnrLM";
    // axios
    //   .get(`//157.245.147.239:80/v1/api/admin/quiz/${roomID}`, {
    //     headers: {
    //       Authorization: `Bearer ${Token}`,
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     return res.data;
    //   })
    //   .catch((error) => console.log(error));

    const res = await axios.get(
      `//157.245.147.239:80/v1/api/admin/quiz/${roomID}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      return res.data;
    }
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
