import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import AboutWork from "../components/AboutWork";
import AboutOwner from "../components/AboutOwner";
import Footer from "../components/Footer";

const products = [
  { id: 1, name: "Handmade Vase", price: 25, image: "/products/vase.jpg" },
  { id: 2, name: "Decorative Candle", price: 15, image: "/products/candle.jpg" },
  { id: 3, name: "Art Canvas", price: 40, image: "/products/canvas.jpg" },
  { id: 4, name: "Mini Sculpture", price: 30, image: "/products/sculpture.jpg" },
];

export default function Home() {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-25%", "-50%", "-75%", "0%"],
        transition: { duration: 16, ease: "linear", repeat: Infinity },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <div>
      <Hero />

      {/* Featured Products Carousel */}
      <section className="py-16 px-4 bg-pink-50 overflow-hidden">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">Featured Products</h2>

        <div
          className="flex w-full overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => setIsPaused(!isPaused)}
        >
          <motion.div animate={controls} className="flex w-[400%]">
            {products.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-full md:w-1/4 p-2">
                <ProductCard product={p} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Work */}
      <AboutWork />

      {/* About Owner */}
      <AboutOwner />
      <Footer/>
    </div>
  );
}

