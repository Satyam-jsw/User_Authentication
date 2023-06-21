import { Route, Routes } from 'react-router-dom'
import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import Pagenotfound from './components/Pagenotfound'
import Footer from './components/Footer'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/forget/:id/:token' element={<ForgetPassword/>} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
      {/* <Footer /> */}

    </>
  )
}

export default App