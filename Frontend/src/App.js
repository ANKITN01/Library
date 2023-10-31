import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Component/Navbar/Nav";
import "./App.css";
import Signup from "./Component/SignUp/Signup";
import PrivateComponent from "./Component/PrivateComponent/PrivateComponent";
import Login from "./Component/Login/Login";
import AddProduct from "./Component/AddProduct/AddProduct";
import ProductList from "./Component/ProductList/ProductList";
import UpdateProduct from "./Component/UpdateProduct/UpdateProduct";
import ProductUser from "./Component/ProductUser";
import Details from "./Component/Details/Details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
  
        <Routes>
          <Route path="/" element={<ProductUser/>}></Route>
          <Route path="/description/:id" element={<Details/>}></Route>
          <Route element={<PrivateComponent></PrivateComponent>}>
          <Route path="/product" element={<ProductList/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          
          </Route>
          <Route path="/signup" element={<Signup></Signup>} />
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
