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
import AdminLayout from "./components/adminComponents/adminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Features from "./pages/admin/Features";
import Orders from "./pages/admin/Orders";
import AdminProduct from "./pages/admin/AdminProduct";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white w-full">
      <Routes>

        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        <Route path="/admin" element={<AdminLayout></AdminLayout>}>
          <Route path="dashboard" element={<AdminDashboard></AdminDashboard>}></Route>
          <Route path="product" element={<AdminProduct></AdminProduct>}></Route>
          <Route path="feature" element={<Features></Features>}></Route>
          <Route path="orders" element={<Orders></Orders>}></Route>
        </Route>

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
