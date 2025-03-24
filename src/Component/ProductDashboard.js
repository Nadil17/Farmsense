import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/auth/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product details.</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Type:</strong> {product.type}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Stock Quantity:</strong> {product.stockQuantity}</p>
      <p><strong>Manufacturing Date:</strong> {product.manufacturingDate}</p>
      <p><strong>Expiry Date:</strong> {product.expiryDate}</p>
      <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
      <p><strong>Application Method:</strong> {product.applicationMethod}</p>
      <p><strong>Safety Instructions:</strong> {product.safetyInstructions}</p>
      <p><strong>Status:</strong> {product.active ? "Active" : "Inactive"}</p>
      <p><strong>Banned:</strong> {product.banned ? "Yes" : "No"}</p>
      <div className="mt-4">
        <Link to={`/product/edit/${product.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</Link>
        <Link to={`/product/delete/${product.id}`} className="bg-red-500 text-white px-4 py-2 rounded">Delete</Link>
      </div>
      <Link to="/" className="mt-4 block text-blue-500">Back to Product Dashboard</Link>
    </div>
  );
};

export default ProductDetail;
