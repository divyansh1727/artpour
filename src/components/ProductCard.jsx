import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart(); // ✅ FIXED
  const { user } = useAuth(); // 🔐 AUTH

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // ✅ Auto-fill from Google
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  // 🔐 PROTECTED BUY BUTTON
  const handleBuy = (e) => {
    e.stopPropagation();

    if (!user) {
      setShowLogin(true);
      return;
    }

    setShowModal(true);
  };

  // 🛒 OPTIONAL: Add to cart (if you use it)
  const handleAddToCart = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    addToCart(product, 1);
    alert("✅ Product added to cart!");
  };

  const handleBuySubmit = () => {
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill all details!");
      return;
    }

    setLoading(true);

    try {
      const phoneNumber = "917838548016";

      let text = `*New Purchase Request*\n\n`;
      text += `_Product_: ${product.name}\n`;
      text += `_Price_: ${formatPrice(product.price)}\n`;

      text += `\n*Customer Info:*\nName: ${formData.name}\nEmail: ${formData.email}\nAddress: ${formData.address}`;

      const encodedText = encodeURIComponent(text);
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isMobile) {
        window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedText}`;
      } else {
        window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
      }

      alert("✅ Order sent to WhatsApp!");
      setFormData({ name: "", email: "", address: "" });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* CARD */}
      <motion.div
        onClick={() => navigate(`/product/${product._id}`)}
        className="w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer"
      >
        {/* MEDIA */}
        {product.videos?.[0] ? (
          <video
            src={product.videos[0]}
            className="w-full h-64 object-cover"
            autoPlay
            muted
            loop
          />
        ) : product.images?.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 w-full h-64">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>
        ) : product.image ? (
          <img
            src={product.image}
            alt=""
            className="w-full h-64 object-cover rounded-lg"
          />
        ) : null}

        {/* INFO */}
        <div className="flex flex-col flex-1 p-4 justify-between">
          <h2 className="text-pink-600 font-bold text-lg">
            {product.name}
          </h2>

          <div className="text-gray-200 font-semibold mt-auto">
            {formatPrice(product.price)}
          </div>

          <button
            onClick={handleBuy}
            className="mt-3 w-full bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition"
          >
            Buy
          </button>
        </div>
      </motion.div>

      {/* BUY MODAL */}
      {showModal &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 w-96 max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-pink-600 mb-4">
                Buy {product.name}
              </h3>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-2 p-2 border rounded"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mb-2 p-2 border rounded"
              />

              <textarea
                name="address"
                placeholder="Your Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mb-2 p-2 border rounded"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-full bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={handleBuySubmit}
                  className="px-4 py-2 rounded-full bg-green-500 text-white"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Send via WhatsApp"}
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}

      {/* 🔐 LOGIN MODAL */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}