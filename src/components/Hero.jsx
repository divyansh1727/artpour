import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-pink-300 via-white to-pink-200 min-h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-script text-pink-600 mb-6"
      >
        Handmade Art & Craft by PourByKay
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg md:text-xl font-sans text-gray-700 mb-8 max-w-xl"
      >
        Unique, handcrafted art pieces made with love. Discover and bring home creativity!
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-500 transition"
      >
        Shop Now
      </motion.button>
    </section>
  );
}
