import { motion } from "framer-motion";
import { ArrowDown, Paintbrush, Palette, Box } from "lucide-react";

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById("featured-products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-r from-pink-300 via-white to-pink-200 min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden italic">
      
      {/* Floating art icons */}
      <motion.div
        className="absolute top-10 left-5 text-pink-500 opacity-60"
        animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Paintbrush size={40} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-10 text-pink-600 opacity-50"
        animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Palette size={39} />
      </motion.div>
      <motion.div
        className="absolute bottom-28 left-1/2 text-pink-400 opacity-60"
        animate={{ y: [0, 10, 0], rotate: [0, 360, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Box size={40} />
      </motion.div>

      {/* Hero Text */}
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
        className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl"
      >
        Unique, handcrafted art pieces made with love. Discover and bring home creativity!
      </motion.p>

      {/* Explore Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-500 transition mb-20"
        onClick={scrollToProducts}
      >
        Explore Products
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 text-pink-600"
      >
        <ArrowDown size={28} />
      </motion.div>
    </section>
  );
}
