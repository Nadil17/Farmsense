import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/auth/products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <Link to="/create-product" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</Link>
      <ul className="mt-4">
        {products.map(product => (
          <li key={product.id} className="border-b p-2">
            <Link to={`/product/${product.id}`} className="text-blue-600">{product.name}</Link>
            <span className="ml-4 text-gray-500">${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
