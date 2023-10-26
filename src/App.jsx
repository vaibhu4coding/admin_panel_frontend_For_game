import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './pages/Login/Login';
import Player from './pages/Player/Player';
import Wallet from './pages/Wallet/Wallet';
import User from './pages/User/User';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<AdminLogin></AdminLogin>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
        <Route exact path='/players' element={<Player></Player>}></Route>
        <Route exact path='/wallet' element={<Wallet></Wallet>}></Route>
          <Route exact path='/users' element={<User></User>}></Route>
        </Route>
        <Route path='*' element={<h1>Error 404</h1>}></Route>
      </Routes>
    </Router>
  )
}

export default App
