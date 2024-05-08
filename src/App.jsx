import NavBar from "../src/components/navBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "../src/views/productList";
import "./App.css";
import AdminPanel from "./views/adminPage";
import React, { useState, useEffect } from "react";

import products from './data/products';

let productsList = JSON.parse(localStorage.getItem("products"));
if (!productsList) {
  productsList = products;
}

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = JSON.parse(localStorage.getItem("products"));
      if (savedProducts) {
        setProducts(savedProducts);
      }
    };
    loadProducts();
    window.addEventListener("storage", loadProducts);
    return () => {
      window.removeEventListener("storage", loadProducts);
    };
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
