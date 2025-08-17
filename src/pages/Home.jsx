import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import AboutWork from "../components/AboutWork";
import AboutOwner from "../components/AboutOwner";
import Footer from "../components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icon library
import p1 from "../assets/products/p1.jpg";
import p2 from "../assets/products/p2.jpg";
import p3 from "../assets/products/p3.jpg";
import p4 from "../assets/products/p4.jpg";
import V1 from "../assets/products/v1.mp4"

const products = [
  { id: 1, name: "Rakhi", price: 25, image: p1 },
  { id: 2, name: "Decorative Candle", price: 15, image: p2 },
  { id: 3, name: "Art Canvas", price: 40, image: p3 },
  { id: 4, name: "Mini Sculpture", price: 30, image: p4 },
  { id: 5, name: "Art", price: 50, image: V1 },

];

export default function Home() {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef(null);

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

  // Manual scroll for arrow buttons
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };
  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="italic">
      <Hero />

      {/* Featured Products Carousel */}
      <section className="relative w-full py-12" id="featured-products">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          Featured Products
        </h2>

        {/* Arrow Buttons (scoped to this section only) */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          <ChevronRight />
        </button>

        <div
          ref={containerRef}
          className="flex w-full overflow-x-auto scrollbar-hide relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <motion.div animate={controls} className="flex min-w-max">
            {products.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-72 p-2">
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
      <Footer />
    </div>
  );
}


