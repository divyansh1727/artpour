import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ for navigation
import { motion } from "framer-motion";
import { ArrowDown, Paintbrush, Palette, Box, Search } from "lucide-react";

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // ✅ navigation hook

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value); // 🔥 still sends search to parent if needed
  };

  // ✅ instead of scrolling, go to /products
  const goToProducts = () => {
    navigate("/products");
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden font-bold">
      {/* ✅ Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/VV.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Floating art icons */}
      <motion.div
        className="absolute top-10 left-5 text-pink-200 opacity-80"
        animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Paintbrush size={50} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-10 text-pink-300 opacity-80"
        animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Palette size={50} />
      </motion.div>
      <motion.div
        className="absolute bottom-28 left-1/2 text-pink-400 opacity-80"
        animate={{ y: [0, 10, 0], rotate: [0, 360, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Box size={50} />
      </motion.div>

      {/* Hero Text */}
      <motion.h1
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="text-5xl md:text-6xl font-noto font-bold text-white drop-shadow-lg mb-6"
>
  Handmade Art & Craft by PourByKay
</motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg md:text-xl text-white/90 mb-8 max-w-xl drop-shadow"
      >
        Unique, handcrafted art pieces made with love. Discover and bring home
        creativity!
      </motion.p>

      {/* 🔍 Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative w-full max-w-md mb-8"
      >
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for art..."
            className="flex-1 px-4 py-2 text-gray-700 outline-none"
          />
          <Search className="text-pink-600 mx-3" />
        </div>
      </motion.div>

      {/* ✅ Explore Button (navigates to /products) */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-500 transition mb-20 shadow-lg"
        onClick={goToProducts}
      >
        Explore Products
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 text-white"
      >
        <ArrowDown size={35} />
      </motion.div>
    </section>
  );
}