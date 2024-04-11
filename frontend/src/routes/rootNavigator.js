import React from 'react'
import { Routes, Route } from'react-router-dom'
import { Dashboard, Home, Login, Signup,Profile, Studio, Notfound } from '../pages'

const rootNavigator = () => {
  return (

    <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/studio' element={<Studio/>}/>
        <Route path='*' element={<Notfound/>}/>

    </Routes>
    
  )
}

export default rootNavigator