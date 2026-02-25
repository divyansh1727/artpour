import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage"; // 🔥 create this page
import AdminLogin from "./pages/AdminLogin";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Splash + Home as your landing page */}
        <Route
          path="/"
          element={
            <>
              <SplashScreen />
              <Home />
            </>
          }
        />

        {/* Products page */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />


        
      </Routes>
    </Router>
  );
}