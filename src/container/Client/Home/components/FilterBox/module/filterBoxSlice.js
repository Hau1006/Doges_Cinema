import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieTicket } from "./filterBoxApi";

const initialState = {
  movieTicketData: [],
  status: 'false'
}

export const getMovieTicketAsync = createAsyncThunk(
  'module/getMovieTicket',
  async (maPhim) => {
    const response = await getMovieTicket(maPhim).then(data => {
      return data;
    });
    return response.data;
  }
)

export const movieTicketSlice = createSlice({
  name: 'movieTicket',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieTicketAsync.pending, (state) => {
        state.status = 'loading';
        console.log('movieTicket loading');
      })
      .addCase(getMovieTicketAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.movieTicketData = action.payload;
        console.log('movieTicket done');
      })
  }
})

export const selectMovieTicket = (state) => state.movieTicket.movieTicketData;

export default movieTicketSlice.reducer;