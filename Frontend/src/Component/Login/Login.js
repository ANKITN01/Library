import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // useEffect(()=>{
  //   const auth = localStorage.getItem('user');
  //   if(auth){
  //     navigate('/')
  //   }
  // },[]);

  const handleLogin = async ()=>{
    let result =await fetch("http://localhost:5000/login",{
      method:'post',
      body:JSON.stringify({email,password}),
      headers:{
        'Content-Type':'application/json'
      }
    });
    result = await result.json();
    if(result.name){
      localStorage.setItem("user",JSON.stringify(result));
      const auth = localStorage.getItem('user');
    if(auth){
      navigate('/product')
    }
    }
    else{
      alert("please enter connect details");
    }
    

  };
  return (
    <div className='login'>
      <h1>Login</h1>
      <input type='text' className='inputBox' placeholder='Enter Email' value={email}
      onChange={(e) => setEmail(e.target.value)}/>
      <input type='text' className='inputBox' placeholder='Enter Password'   value={password}
      onChange={(e) => setPassword(e.target.value)}/>
      <button className='appButton' type="button" onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login;