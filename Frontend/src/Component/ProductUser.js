import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products");
      if (result.ok) {
        const data = await result.json();
        setProducts(data);
      } else {
        console.error("Error fetching products:", result.status);
        // Handle the error, e.g., set an error state or show an error message
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error, e.g., set an error state or show an error message
    }
  };

  return (
    <>
      <div className="product-list">
        <h1>Books List</h1>
        <ul>
          <li>Sr. No</li>
          <li>Name</li>
          <li>Price</li>
          <li>Author</li>
          <li>Excerpt</li>
          <li>Geners</li>
        </ul>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>RS.{item.author}</li>
              <li>{item.genres}</li>
              <li>{item.excerpt}</li>
              <Link className="updateButton" to={"/description/" + item._id}>
                Update
              </Link>
            </ul>
          ))
        ) : (
          <p>No Products available</p>
        )}
      </div>
    </>
  );
};

export default ProductList;
