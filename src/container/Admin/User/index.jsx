import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './Pages/Main'
import NotFound from '../../../components/Common/NotFound'
import AddEdit from './Pages/AddEdit'
function User() {
    return (
        <Routes>
            <Route index exact element={<MainPage />} />
            <Route path={"add-user"} exact element={<AddEdit />} />
            <Route path={"/:id"} element={<AddEdit />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    )
}

export default User
