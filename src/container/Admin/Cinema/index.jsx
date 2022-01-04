import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './Pages/Main'
import NotFound from '../../../components/Common/NotFound'
import DetailCinema from './Pages/DetailCinema'
function Cinema() {
    return (
        <Routes>
            <Route index exact element={<MainPage />} />
            <Route path={"/:id"} element={<DetailCinema />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    )
}

export default Cinema
