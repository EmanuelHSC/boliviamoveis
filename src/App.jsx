import React, { useState, useEffect } from "react";
import NavBar from "../src/components/navBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "../src/views/productList";
import "./App.css";
import AdminPanel from "./views/adminPage";
import UserAdminPanel from "./views/UserAdminPanel";
import Cart from "./views/cart";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/users" element={<UserAdminPanel />} />
          <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;