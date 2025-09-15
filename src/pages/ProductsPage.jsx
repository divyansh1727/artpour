import { useNavigate } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import logo from "/logo.png"; // ✅ from public folder
import { products } from "../data/products"; // ✅ your static products

export default function ProductsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* ✅ Logo + Back Button */}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="Logo" className="h-20 mb-4" />
        <button
          onClick={() => navigate("/")}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-500"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
        All Products
      </h2>

      {/* ✅ Static ProductsList */}
      <ProductsList products={products} />
    </div>
  );
}
