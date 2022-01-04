import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMovieDetail } from './movieApi';

const initialState = {
    movieData: [],
    status: '',
};

export const getMovieAsync = createAsyncThunk(
    'module/getMovieDetail',
    async (movieId) => {
        const response = await getMovieDetail(movieId).then(data => {
            return data;
        });
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const movieSlice = createSlice({
    name: 'movieDetail',
    initialState,
    reducers: {
        reset: (state) => {
            state.movieData = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovieAsync.pending, (state) => {
                state.status = 'loading';
                //console.log('loading');
            })
            .addCase(getMovieAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.movieData = action.payload;
                //console.log('done');
            });
    },
});

// create action
export const { reset } = movieSlice.actions;

// get movie detail
export const selectMovie = (state) => state.movieDetail.movieData;

export default movieSlice.reducer;