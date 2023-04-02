/* eslint-disable react/no-children-prop */
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import React from 'react'
import User from './pages/users/user'
import Trash from './pages/lixeira/trash'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/lixeira" element={<Trash />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
