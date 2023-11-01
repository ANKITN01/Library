import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const navigate = useNavigate();

  const URL = '';

  const addProduct = async () => {
    console.log(name, author, genres, excerpt);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user._id;
      try {
        const response = await fetch(`${URL}/add-product`, {
          method: "POST",
          body: JSON.stringify({ name, author, genres, excerpt, userId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        console.log(result);
        navigate('/');

        // Handle the response or update state as needed
      } catch (error) {
        console.error("Error adding product:", error);
        // Handle the error, e.g., show an error message to the user
      }
    } else {
      // Handle the case where the user is not logged in or the user data is not available
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter Product Author"
        className="inputBox"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
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
      <button className="appButton" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
