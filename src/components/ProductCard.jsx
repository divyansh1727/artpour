import  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { createPortal } from "react-dom";

export default function ProductCard({ product, onPause, onResume }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);

  // Pause autoplay while modal is open
  useEffect(() => {
    if (showModal) onPause?.();
    else onResume?.();
  }, [showModal, onPause, onResume]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBuy = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        productName: product.name,
        productPrice: product.price,
        ...formData,
        createdAt: serverTimestamp(),
      });

      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          productName: product.name,
          productPrice: product.price,
          name: formData.name,
          email: formData.email,
          address: formData.address,
        },
        "YOUR_PUBLIC_KEY"
      );

      alert("Purchase successful! PourByKay will contact you soon.");
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
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        onTouchStart={onPause}
        onTouchEnd={onResume}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
          draggable={false}
        />
        <div className="p-4">
          <h2 className="text-pink-600 font-bold text-lg">{product.name}</h2>
          <p className="text-gray-700 font-semibold">${product.price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent Swiper drag
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
                  className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBuy}
                  className="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-500 transition"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
}
