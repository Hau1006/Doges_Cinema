import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Client/Header/Header';
import MovieDetail from './MovieDetail';
import SeatPlan from './SeatPlan';
import Home from './Home/Home';
import BookingHistory from './BookingHistory'

function Index() {
   return (
      <> 
         <Header />
         <Routes>
            <Route path="/movie-detail/:maPhim" element={<MovieDetail />} /> 
            <Route path="/seat-plan/:maLichChieu" element={<SeatPlan />} />
            <Route path="/" element={<Home />} /> 
            <Route path="/booking-history" element={<BookingHistory />} />
         </Routes>
      </>
   );
}

export default Index;