import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const URL = '';
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch(`${URL}/products`);
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
}

const deleteProduct = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`${URL}/product/${id}`, {
          method: "DELETE"
        });
        console.log(id);

        if (response.ok) {
          getProducts();
        } else {
          console.error("Error deleting product:", response.status);
          // Handle the error, e.g., show an error message
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        // Handle the error, e.g., show an error message
      }
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        <li>Sr. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Author</li>
        <li>Excerpt</li>
        <li>Generes</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.author}</li>
            <li>{item.genres}</li>
{/* <li>{item.excerpt}</li> */}
            <li>
            <button
                data-id={item._id} // Set the data-id attribute with the product's id
                
                onClick={(e) => deleteProduct(e.target.getAttribute("data-id"))}
              >
                Delete
              </button>
            </li>
            <Link className="updateButton" to={"/update/" + item._id}>Update</Link>
          </ul>
        ))
      ) : (
        <p>No Products available</p>
      )}

      
    </div>
  );
};

export default ProductList;
