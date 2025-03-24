import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/auth/products/${id}`, product)
      .then(() => navigate("/"))
      .catch((error) => setError(error.response?.data || "Error updating product"));
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product details.</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={product.name} onChange={handleChange} className="border p-2 w-full" required />
        <textarea name="description" value={product.description} onChange={handleChange} className="border p-2 w-full" required></textarea>
        <select name="type" value={product.type} onChange={handleChange} className="border p-2 w-full">
          <option value="FERTILIZER">Fertilizer</option>
          <option value="PESTICIDE">Pesticide</option>
          <option value="CHEMICAL">Chemical</option>
          <option value="OTHER">Other</option>
        </select>
        <input type="number" name="price" value={product.price} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} className="border p-2 w-full" required />
        <input type="date" name="manufacturingDate" value={product.manufacturingDate} onChange={handleChange} className="border p-2 w-full" required />
        <input type="date" name="expiryDate" value={product.expiryDate} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="manufacturer" value={product.manufacturer} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="applicationMethod" value={product.applicationMethod} onChange={handleChange} className="border p-2 w-full" />
        <textarea name="safetyInstructions" value={product.safetyInstructions} onChange={handleChange} className="border p-2 w-full"></textarea>
        <label className="block">
          <input type="checkbox" name="active" checked={product.active} onChange={handleChange} /> Active
        </label>
        <label className="block">
          <input type="checkbox" name="banned" checked={product.banned} onChange={handleChange} /> Banned
        </label>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
