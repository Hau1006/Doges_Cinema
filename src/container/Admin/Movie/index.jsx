import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../Movie/Components/MovieList/index";
import NotFound from "../../../components/Common/NotFound";
import AddEdit from "../Movie/Pages/AddMovie/index";
import EditMovie from "../Movie/Pages/EditMovie/index";
import ShowTime from "./Pages/ShowTime";
import Seat from './Pages/Seat'
import AddSchedule from './Pages/AddSchedule'
function Movie() {
  return (
    <Routes>
      <Route index exact element={<MainPage />} />
      <Route path={"add-movie"} exact element={<AddEdit />} />
      <Route path={"/:id"} element={<EditMovie />} />
      <Route path={"showtime/:id"} element={<ShowTime />} />
      <Route path={"/detail-seat/:id"} element={<Seat />} />
      <Route path={"add-schedule/:id"} element={<AddSchedule />} />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
}

export default Movie;
