import React from "react";
import './Nav.css';
import { Link,useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () =>{
    localStorage.clear();
    navigate('/')
  }
  return (
    <>
        {
                auth ?
            <ul className='nav-ul'>
           
            <li><Link to='/product'>Product</Link></li>
            <li><Link to='/add'>Add Product</Link></li>
            <li><Link to='/update/:id'>Update</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link onClick={logout} to="/">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
                <ul className='nav-ul nav-right'>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
}
    </>
  );
};

export default Nav;
