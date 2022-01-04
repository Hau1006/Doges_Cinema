import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../../../../apis/callApi";
import { getMovieList } from "./movieListApi";

const initialState = {
  movieListData: [],

  status: "false",
};

export const getMovieListAsync = createAsyncThunk(
  "module/getMovieList",
  async (page) => {
    const response = await getMovieList(page).then((data) => {
      return data;
    });
    //fulfilled payload here
    return response.data;
  }
);


export const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(getMovieListAsync.pending, (state) => {
        state.status = "loading";
        console.log("loading");
      })
      .addCase(getMovieListAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.movieListData = action.payload;
        console.log("work OK", typeof state.movieListData);
      });

  },
});

export const selectMovieList = (state) => state.movieList.movieListData;

export default movieListSlice.reducer;
