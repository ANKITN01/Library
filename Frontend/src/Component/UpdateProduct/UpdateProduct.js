import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './UpdateProduct.css';

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      let result = await fetch(`http://localhost:5000/product/${params.id}`);
      if (result.ok) {
        const data = await result.json();
        console.warn(data);
        setName(data.name);
        setAuthor(data.author);
        setGenres(data.genres);
        setExcerpt(data.excerpt);
      } else {
        console.error("Error fetching product details:", result.status);
        // Handle the error, e.g., set an error state or show an error message
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle the error, e.g., set an error state or show an error message
    }
  };

  const updateProduct = async () => {
    try {
      console.log(name, author, genres, excerpt);
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, author, genres, excerpt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data);
        navigate("/"); // Redirect to the main page upon a successful update
      } else {
        console.error("Error updating product:", result.status);
        // Handle the error, e.g., show an error message
      }
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></input>
      <input
        type="text"
        placeholder="Enter Product Author"
        className="inputBox"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      ></input>
      <input
        type="text"
        placeholder="Enter Product Genres"
        className="inputBox"
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter Product Excerpt"
        className="inputBox"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      ></input>
      <button className="appButton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
