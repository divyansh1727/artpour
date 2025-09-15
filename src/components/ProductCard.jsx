import { useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  const handleBuy = () => {
    setLoading(true);
    try {
      const phoneNumber = "917838548016";

      let text = `*New Purchase Request*\n\n`;
      text += `_Product_: ${product.name}\n`;
      text += `_Price_: ${formatPrice(product.price)}\n`;
      if (product.discount) {
        const discounted = product.price - (product.price * product.discount) / 100;
        text += `_Discount_: ${product.discount}%\n`;
        text += `_Discounted Price_: ${formatPrice(discounted)}\n`;
      }

      if (product.description) {
        text += `_Description_: ${product.description}\n`;
        if (product.descriptionPrice) {
          text += `_Description Price_: ${formatPrice(product.descriptionPrice)}\n`;
        }
      }

      if (product.bulkPrice) {
        text += `_Bulk Price_: ${formatPrice(product.bulkPrice)} / piece\n`;
      }

      text += `\n*Customer Info:*\nName: ${formData.name}\nEmail: ${formData.email}\nAddress: ${formData.address}`;

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
    <motion.div
      className="w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col"
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      {/* Media */}
      {product.images ? (
        <div className="grid grid-cols-2 gap-2 w-full h-64">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name}-${i}`}
              className="w-full h-full object-cover rounded-lg"
              draggable={false}
            />
          ))}
        </div>
      ) : product.image?.endsWith(".mp4") ? (
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

      {/* Info Section */}
      <div className="flex flex-col flex-1 p-4 justify-between">
        <div>
          <h2 className="text-pink-600 font-bold text-lg">{product.name}</h2>

          {/* Description */}
          {product.description && (
            <p className="text-gray-400 text-sm mb-1">
              {product.description}{" "}
              {product.descriptionPrice && (
                <span className="text-gray-300 font-semibold">
                  - {formatPrice(product.descriptionPrice)}
                </span>
              )}
            </p>
          )}
        </div>

        {/* Price + Button */}
        <div className="mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
            {/* Price Section */}
            <div className="flex items-center flex-wrap gap-2">
              {product.discount ? (
                <>
                  <span className="text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-green-400 font-semibold">
                    {formatPrice(
                      product.price - (product.price * product.discount) / 100
                    )}
                  </span>
                  <span className="bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {product.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-gray-200 font-semibold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Bulk Price */}
            {product.bulkPrice && (
              <div className="text-sm text-gray-400">
                Bulk: {formatPrice(product.bulkPrice)} / piece
              </div>
            )}
          </div>

          {/* Extra Offer */}
          {product.offer && (
            <div className="text-sm text-pink-400 mt-1">
              ₹{product.price} {product.offer}
            </div>
          )}

          {/* Buy Button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 w-full bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition"
          >
            Buy
          </button>
        </div>
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