import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function ProductCard({ product, onPauseAutoplay, onResumeAutoplay }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);

  // Pause autoplay while modal is open
  useEffect(() => {
    if (showModal) onPauseAutoplay?.();
    else onResumeAutoplay?.();
  }, [showModal, onPauseAutoplay, onResumeAutoplay]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBuy = () => {
    setLoading(true);
    try {
      const phoneNumber = "917838548016"; // Owner's phone number
      const text = `*New Purchase Request*\n\n_Product_: ${product.name}\n_Price_: $${product.price}\n\n*Customer Info:*\nName: ${formData.name}\nEmail: ${formData.email}\nAddress: ${formData.address}`;
      const encodedText = encodeURIComponent(text);

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isMobile) {
        // Open WhatsApp App
        window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedText}`;
      } else {
        // Open WhatsApp Web
        window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
      }

      // Success popup
      alert("✅ Order details sent to WhatsApp. Our team will contact you soon!");

      // Reset form & close modal
      setFormData({ name: "", email: "", address: "" });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
      >
        {product.image.endsWith(".mp4") ? (
  <video
    src={product.image}
    muted
    loop
    playsInline
    preload="auto"
    className="w-full h-56 object-cover"
    onMouseEnter={(e) => {
      if (e.currentTarget && typeof e.currentTarget.play === "function") {
        e.currentTarget.play().catch(() => {}); // ignore play errors
      }
    }}
    onMouseLeave={(e) => {
      if (e.currentTarget && typeof e.currentTarget.pause === "function") {
        e.currentTarget.pause();
      }
    }}
  />
) : (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => e.currentTarget.pause()}
           // prevents ghost image on drag
        />
  )}
        <div className="p-4 italic">
          <h2 className="text-pink-600 font-bold text-lg">{product.name}</h2>
          <p className="text-gray-700 font-semibold">${product.price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevents Swiper from triggering slide change
              setShowModal(true);
            }}
            className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition"
          >
            Buy
          </button>
        </div>
      </motion.div>

      {showModal &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
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
                  onClick={() => setShowModal(false)}
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
    </>
  );
}
