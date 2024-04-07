import React from 'react'
import { Routes, Route } from'react-router-dom'
import { Home, Login, Signup } from '../pages'
const rootNavigator = () => {
  return (

    <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

    </Routes>
    
  )
}

export default rootNavigator