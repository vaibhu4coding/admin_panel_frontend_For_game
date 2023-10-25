import React, { useState } from 'react';
import Axios from 'axios';
import './AdminLogin.css'; 

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    const data = {
      email,
      password,
    };

    Axios.post('http://localhost:5000/api/v1/admin/login', data)
      .then((response) => {
        if (response.status === 200) {
          alert(`Login successful: ${response.data.message}`);
            localStorage.setItem('adminToken', response.data.token);
            window.location.href = "/dashboard"
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert('An error occurred.');
        console.error(error);
      });
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Admin Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
