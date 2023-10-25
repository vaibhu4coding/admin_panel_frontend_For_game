import React from 'react'
import './Navigation.css'
import { NavLink } from 'react-router-dom'
const Navigation = () => {
  return (
      <div className="dashboard-container">
          <div className="dashboard-card red-card">
              <NavLink to="/users">
                  <p>Users</p>
                </NavLink>
      </div>
      <div className="dashboard-card blue-card">
        <NavLink to='/players'>
          <p>Players</p>
        </NavLink>
      </div>
      <div className="dashboard-card green-card">
        <NavLink to='/wallet'>
          <p>Wallet</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Navigation
