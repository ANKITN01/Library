import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const URL = '';
  // const validateEmail = (input) => {
  //   // A simple email validation regex
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(input);
  // };

  // const validatePassword = (input) => {
  //   return input.length >= 8; 
  // };

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  },[])

  const collectData = async () => {
    // if (!name || !email || !password) {
    //   setError("All fields are required");
    //   return;
    // }

    // if (!validateEmail(email)) {
    //   setError("Invalid email address");
    //   return;
    // }

    // if (!validatePassword(password)) {
    //   setError("Password must be at least 8 characters long");
    //   return;
    // }

    let result =await fetch(`${URL}/signup`,{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        'Content-Type':'application/json'
      }
    });
result = await result.json()
console.warn(result);
localStorage.setItem("user", JSON.stringify(result));
navigate('/')

  }

  return (
    <div className="register">
    <h1>Register</h1>
    <input
      className="inputBox"
      type="text"
      placeholder="Enter Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    ></input>
    <input
      className="inputBox"
      type="text"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    ></input>
    <input
      className="inputBox"
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    ></input>
    <button className="signUp" onClick={collectData}>
      Sign Up
    </button>
    {/* {error && <p className="error-message">{error}</p>} */}
  </div>
  )
}

export default Signup;