import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function OrderSuccess() {
  const { cart } = useCart(); // optional if you want summary

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-lg w-full"
      >
        {/* Animated Check */}
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
        >
          <span className="text-4xl text-green-600">✓</span>
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Your order has been received. We’ll contact you soon on WhatsApp.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Back to Home
          </Link>

          <Link
            to="/shop"
            className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}