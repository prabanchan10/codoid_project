import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

function Login() {
  const [emailid, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { emailid, password });
      console.log(response.data.jwtToken);
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={emailid}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
