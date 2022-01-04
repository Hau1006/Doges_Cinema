import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../../../apis/callApi";

export const fetchMovieAsync = createAsyncThunk(
  "movie/fetchmovie",
  async () => {
    const response = await callApi("QuanLyPhim/LayDanhSachPhim?MaNhom=GP02");
    return response.data;
  }
);

export const EditAsyncMovies = createAsyncThunk(
  "movie/editmovie",
  async (data) => {
    const res = await callApi(
      "QuanLyPhim/CapNhatPhimUpload",
      "POST",
      data.body,
      data.token
    );
    if (res?.status === 200) {
      return {
        status: res.status,
        data: res.data,
      };
    }

    // return response.data;
  }
);

// export const postAsyncMovies = createAsyncThunk(
//   "movie/addMovie",
//   async (data) => {
//     const res = await callApi(
//       `QuanLyPhim/ThemPhimUploadHinh?MaNhom=GP02`,
//       "POST",
//       data.body,
//       data.token
//     );
//     if (res?.status === 200) {
//       return {
//         status: res.status,
//         data: data.body,
//       };

//     }

//   }
// );

export const postAsyncMovies = createAsyncThunk(
  "movie/addMovie",
  async (data) => {
    const res = await callApi(
      `QuanLyPhim/ThemPhimUploadHinh?MaNhom=GP02`,
      "POST",
      data.body,
      data.token
    );
    if (res?.status === 200) {
      return {
        status: res.status,
        data: res.data,
        message: "Thêm movie thành công",
      };
    } else {
      return res.response.data;
    }
  }
);

// export const editUserAsync = createAsyncThunk(
//     'user/editUser',
//     async (data) => {
//         const res = await callApi(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, "PUT", data.body, data.token);
//         if (res?.status === 200) {
//             return {
//                 status: res.status,
//                 data: data.body,
//                 message: 'Sửa user thành công'
//             }
//         } else {
//             return res.response.data;
//         }
//     }
// );

export const deleteMovieAsync = createAsyncThunk(
  "movie/deleteMovie",
  async (data) => {
    const res = await callApi(
      `QuanLyPhim/XoaPhim?MaPhim=${data.maPhim}`,
      "DELETE",
      data.body,
      data.token
    );
    if (res?.status === 200) {
      return {
        status: res.status,
        data: res.data,
        message: "Xóa Movie thành công",
        maPhim: data.maPhim,
      };
    } else {
      return res.response.data;
    }
  }
);

const movieSplice = createSlice({
  name: "movie",
  initialState: { movie: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieAsync.fulfilled, (state, action) => {
        state.movie = action.payload.reverse();
      })
      .addCase(EditAsyncMovies.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (state.movie.length > 0) {
          const index = state.movie.findIndex(
            (v, index) => v.maPhim === data.maPhim
          );
          if (index > -1) {
            state.movie[index] = data;
          }
        }
      })
      .addCase(postAsyncMovies.fulfilled, (state, action) => {
  

        state.movie.unshift(action.payload.data);
      })

      .addCase(deleteMovieAsync.fulfilled, (state, action) => {
        const index = state.movie.findIndex(
          (film) => film.maPhim === action.payload.maPhim
        );
        state.movie.splice(index, 1);
      });
  },
});

export const selectMovieList = (state) => state.movie.movie;
export default movieSplice.reducer;
