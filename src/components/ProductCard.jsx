import { useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBuy = () => {
    setLoading(true);
    try {
      const phoneNumber = "917838548016";
      const text = `*New Purchase Request*\n\n_Product_: ${product.name}\n_Price_: $${product.price}\n\n*Customer Info:*\nName: ${formData.name}\nEmail: ${formData.email}\nAddress: ${formData.address}`;
      const encodedText = encodeURIComponent(text);
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isMobile) {
        window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedText}`;
      } else {
        window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
      }

      alert("✅ Order details sent to WhatsApp. Our team will contact you soon!");
      setFormData({ name: "", email: "", address: "" });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  if (!product) return <p className="text-center text-white">Product not available</p>;

  return (
    <motion.div
      className="w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Media */}
      {product.image.endsWith(".mp4") ? (
        <video
          src={product.image}
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-64 object-cover"
          autoPlay
        />
      ) : (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
          draggable={false}
        />
      )}

      {/* Info */}
      <div className="p-4">
        <h2 className="text-pink-600 font-bold text-lg">{product.name}</h2>
        <p className="text-gray-200 font-semibold">${product.price}</p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-3 w-full bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition"
        >
          Buy
        </button>
      </div>

      {/* Modal */}
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
              <h3 className="text-xl font-bold text-pink-600 mb-4">Buy {product.name}</h3>
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
                  className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBuy}
                  className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Send via WhatsApp"}
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </motion.div>
  );
}
