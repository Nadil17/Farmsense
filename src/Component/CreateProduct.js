import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    type: "FERTILIZER",
    price: "",
    stockQuantity: "",
    manufacturingDate: "",
    expiryDate: "",
    manufacturer: "",
    applicationMethod: "",
    safetyInstructions: "",
    minimumStockLevel: 10,
    active: true,
    banned: false,
    user: { id: 1 } // Example user ID, replace with actual user logic
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/auth/products", product)
      .then(() => navigate("/"))
      .catch((error) => setError(error.response?.data || "Error creating product"));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} className="border p-2 w-full" required />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="border p-2 w-full" required></textarea>
        <select name="type" value={product.type} onChange={handleChange} className="border p-2 w-full">
          <option value="FERTILIZER">Fertilizer</option>
          <option value="PESTICIDE">Pesticide</option>
          <option value="CHEMICAL">Chemical</option>
          <option value="OTHER">Other</option>
        </select>
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="stockQuantity" placeholder="Stock Quantity" value={product.stockQuantity} onChange={handleChange} className="border p-2 w-full" required />
        <input type="date" name="manufacturingDate" value={product.manufacturingDate} onChange={handleChange} className="border p-2 w-full" required />
        <input type="date" name="expiryDate" value={product.expiryDate} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="manufacturer" placeholder="Manufacturer" value={product.manufacturer} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="applicationMethod" placeholder="Application Method" value={product.applicationMethod} onChange={handleChange} className="border p-2 w-full" />
        <textarea name="safetyInstructions" placeholder="Safety Instructions" value={product.safetyInstructions} onChange={handleChange} className="border p-2 w-full"></textarea>
        <label className="block">
          <input type="checkbox" name="active" checked={product.active} onChange={handleChange} /> Active
        </label>
        <label className="block">
          <input type="checkbox" name="banned" checked={product.banned} onChange={handleChange} /> Banned
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
