import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import ShopLayout from "./components/shopComponents/ShopLayout";
import Home from "./pages/user/Home";
import Notfound from "./pages/notfound/Notfound";
import Product from "./pages/user/Product";
import Checkout from "./pages/user/Checkout";
import Account from "./pages/user/Account";
import Authlayout from "./components/authComponents/Authlayout";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import AdminLayout from "./components/adminComponents/adminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Features from "./pages/admin/Features";
import Orders from "./pages/admin/Orders";
import AdminProduct from "./pages/admin/AdminProduct";
import CheckAuth from "./components/authComponents/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authReducer";
import PaypalReturn from "./pages/user/PaypalReturn";
import PaypalCancel from "./pages/user/PaypalCancel";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="flex flex-col overflow-hidden bg-white w-full">
      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="feature" element={<Features />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="/shop" element={<ShopLayout />}>
          {/* Protected Routes */}
          <Route
            path="checkout"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Checkout />
              </CheckAuth>
            }
          />

          <Route path="home" element={<Home />} />

          <Route path="product" element={<Product />} />

          <Route
            path="account"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Account />
              </CheckAuth>
            }
          />
        </Route>

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Authlayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>

        <Route path="*" element={<Notfound />} />

        <Route path="order">
          <Route path="success" element={<PaypalReturn />} />
          <Route path="cancel" element={<PaypalCancel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
