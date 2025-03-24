import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Component/Login';
import Register from './Component/Register';
 
import Navbar from './Component/Navbar';
import PrivateRoute from './Component/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
 
import ImageAnalysis from './AI_Component/ImageAnalysis';
import Apps from './AI_Component/apps';
import ProductList from './Component/ProductList';
import CreateProduct from './Component/CreateProduct';
import EditProduct from './Component/EditProduct';
import UserProducts from './Component/UserProducts';
import ProductDetail from './Component/ProductDashboard';
import DeleteProduct from './Component/DeleteProduct';
 


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/AI" element={<ImageAnalysis />} />
              <Route path="/Rec" element={<Apps />} />
              
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/product/delete/:id" element={<DeleteProduct />} />
          <Route path="/user/:userId/products" element={<UserProducts />} />
          
           
              
              <Route path="/dashboard" element={
                <PrivateRoute>
                   
                </PrivateRoute>
              } />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;