import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './pages/Login/Login';
import Player from './pages/Player/Player';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<AdminLogin></AdminLogin>}></Route>
        <Route exact path='/players' element={<Player></Player>}></Route>
      </Routes>
    </Router>
  )
}

export default App
