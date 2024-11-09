import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import ShopLayout from "./components/shopComponents/ShopLayout";
import Home from "./pages/user/Home";
import Notfound from "./pages/notfound/Notfound";
import Product from "./pages/user/Product";
import Checkout from "./pages/user/Checkout";
import Authlayout from "./components/authComponents/Authlayout";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white w-full">
      <Routes>

        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        <Route path="/shop" element={<ShopLayout />}>

          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="checkout" element={<Checkout />} />

        </Route>

        <Route path="/auth" element={<Authlayout />}>

          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />

        </Route>

        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
