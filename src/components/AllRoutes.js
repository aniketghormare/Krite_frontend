import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Signup from '../pages/Signup'
import Login from '../pages/Login'

const AllRoutes = ({token,settoken}) => {
      
    return (
        <div>
            <Routes>
                <Route path='/' element={<Dashboard  token={token} />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login settoken={settoken}/>} />
            </Routes>
        </div>
    )
}

export default AllRoutes
