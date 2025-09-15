import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage"; // 🔥 create this page
import AdminLogin from "./pages/AdminLogin";


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
        
      </Routes>
    </Router>
  );
}