import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AutoCarousel() {
  const products = [
    { id: 1, name: "KeyChain", price: 25, image: "/assets/products/p1.jpg" },
    { id: 2, name: "Bracelet", price: 50, image: "/assets/products/p2.jpg" },
    { id: 3, name: "Mug", price: 70, image: "/assets/products/p3.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000); // 3 seconds
    return () => clearInterval(timer);
  }, [products.length]);

  return (
    <div className="overflow-hidden w-full max-w-lg mx-auto">
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full flex-shrink-0 p-4 bg-gray-800 text-white text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto h-40 object-contain"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>₹{product.price}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
