import React,{useState,useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";


const Details = () => {
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

  return (
    <div className="product">
      <h1>Details</h1>
      <h1>{name}</h1>
    <h2>By {author}</h2>
    <h2>Generes : {genres}</h2>
    <div className='excerpt'>
        <h2>Generes</h2>
        <p>{genres}</p>
    </div>

    </div>
  );
}

export default Details