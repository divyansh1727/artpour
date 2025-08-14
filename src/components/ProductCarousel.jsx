import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductCard = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Product display */}
      <motion.div
        key={products[currentIndex].id}
        className="p-4 bg-gray-900 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={products[currentIndex].image}
          alt={products[currentIndex].name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold text-white">
          {products[currentIndex].name}
        </h3>
        <p className="text-gray-400">${products[currentIndex].price}</p>
      </motion.div>

      {/* Prev button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default ProductCard;
