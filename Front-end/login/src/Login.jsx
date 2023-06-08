import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

function Login() {
  const [email_id, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { email_id, pass });
      console.log(response.data.token);
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email_id}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
