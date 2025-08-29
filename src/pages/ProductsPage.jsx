import ProductCard from "../components/ProductCard";
import logo from "/logo.png"; // ✅ from public folder
import p1 from "../assets/products/p1.jpg";
import p2 from "../assets/products/p2.jpg";
import V1 from "../assets/products/v1.mp4";
import p7 from "../assets/images/p7.jpg";
import p9 from "../assets/images/p9.jpg";
import p10 from "../assets/images/p10.jpg";
import p11 from "../assets/images/p11.jpg";
import p12 from "../assets/images/p12.jpg";
import p13 from "../assets/images/p13.jpg";
import h1 from "../assets/images/h1.jpg";
import h2 from "../assets/images/h2.jpg";
import h3 from "../assets/images/h3.jpg";
import h4 from "../assets/images/h4.jpg";
import k2 from "../assets/images/k2.jpg";
import k1 from "../assets/images/k1.jpg";
import q1 from "../assets/images/q1.jpg";
import q3 from "../assets/images/q3.jpg";
import q2 from "../assets/images/q2.jpg";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Rakhi", price: 90, bulkPrice: 50, image: p1 },
  { id: 2, name: "Customised Photo holder", price: 650, image: p2 },
  { id: 5, name: "Customised Photo keychain", price: 250, image: V1 },
  {
    id: 6,
    name: "Spritual Polaroid",
    price: 50,
    image: p7,
    description: "Fridge magnet, dashboard decor",
    descriptionPrice: 100,
    bulkPrice: 60,
  },
  {
    id: 20,
    name: "Hamper",
    price: 500,
    description: "customisable",
    images: [h1, h2, h3, h4],
  },
  { id: 7, name: "Customised Phone Cover", price: 250, image: p9 },
  { id: 8, name: "Customised seashell keychain", price: 300, image: p10 },
  { id: 9, name: "Phone Cover", price: 250, image: p11 },
  { id: 10, name: "Phone Charm", price: 200, image: p12 },
  { id: 11, name: "Kitchen Resin Tray", price: 1200, image: p13 },
  { id: 12, name: "Bookmark", price: 200, image: k2 },
  { id: 13, name: "Phone Charm", price: 200, image: k1 },
  { id: 15, name: "Keychain", price: 250, image: q1 },
  { id: 16, name: "Dashboard Decor", price: 100, image: q3 },
  { id: 17, name: "Love Letter", price: 100, image: q2 },
];

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

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
