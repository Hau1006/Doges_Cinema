import { configureStore } from "@reduxjs/toolkit";
import movieListReducer from "../container/Client/Home/module/movieListSlice";
import movieTicketReducer from "../container/Client/Home/components/FilterBox/module/filterBoxSlice";

import movieDetailReducer from "../container/Client/MovieDetail/module/movieSlice";
import seatReducer from "../container/Client/SeatPlan/module/seatSlice";
import userReducer from "../container/Admin/User/userSplice";
import movieReducer from "../container/Admin/Movie/movieSplice";
import accountSlice from "./../container/Client/Home/module/accountSlice";
export const store = configureStore({
  reducer: {
    movieDetail: movieDetailReducer,
    seatPlan: seatReducer,
    accountSlice: accountSlice,
    user: userReducer,
    movie: movieReducer,
    movieList: movieListReducer,
    movieTicket: movieTicketReducer,
  },
});
