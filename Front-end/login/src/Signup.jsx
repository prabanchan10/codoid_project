import React from "react";
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api"; 

function Signup() {
  const [email_id, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email_id,
        pass,
        userName,
        phone
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("User Creation Failed", error);
    }
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email_id}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />

        <input
          type="number"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />


        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;
