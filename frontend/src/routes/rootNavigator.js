import React from 'react'
import { Routes, Route } from'react-router-dom'
import { Dashboard, Home, Login, Signup,Profile } from '../pages'

const rootNavigator = () => {
  return (

    <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>

    </Routes>
    
  )
}

export default rootNavigator