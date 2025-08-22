import { useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function ProductCard({ product, onSwipe, pauseCarousel }) {
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

  if (!product)
    return <p className="text-center text-white">Product not available</p>;

  return (
    <div
      className="relative w-full max-w-5xl mx-auto"
      onClick={(e) => e.stopPropagation()} // ✅ prevent bubble to carousel
    >
      {/* Media */}
      {product.image.endsWith(".mp4") ? (
        <video
          src={product.image}
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-56 object-cover rounded-lg"
          autoPlay={/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)}
          onMouseEnter={(e) => {
            if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
              e.currentTarget.play().catch(() => {});
            }
          }}
          onMouseLeave={(e) => {
            if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
              e.currentTarget.pause();
            }
          }}
        />
      ) : (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-lg"
          draggable={false}
        />
      )}

      {/* Info */}
      <div className="p-4 italic">
        <h2 className="text-pink-600 font-bold text-lg">{product.name}</h2>
        <p className="text-gray-700 font-semibold">${product.price}</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ stop carousel click
            setShowModal(true);
            if (pauseCarousel) pauseCarousel(true); // ✅ pause autoplay
          }}
          className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition"
        >
          Buy
        </button>
      </div>

      {/* Modal */}
      {showModal &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
            onClick={() => {
              setShowModal(false);
              if (pauseCarousel) pauseCarousel(false); // ✅ resume autoplay
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 w-96 max-w-full italic"
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
                className="w-full mb-2 p-2 border rounded italic"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mb-2 p-2 border rounded italic"
              />
              <textarea
                name="address"
                placeholder="Your Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mb-2 p-2 border rounded italic"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    if (pauseCarousel) pauseCarousel(false);
                  }}
                  className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition italic"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBuy}
                  className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition italic"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Send via WhatsApp"}
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </div>
  );
}
