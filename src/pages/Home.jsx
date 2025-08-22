import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import AboutWork from "../components/AboutWork";
import Reviews from "../components/Reviews";
import AboutOwner from "../components/AboutOwner";
import Footer from "../components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import p1 from "../assets/products/p1.jpg";
import p2 from "../assets/products/p2.jpg";
import p3 from "../assets/products/p3.jpg";
import p4 from "../assets/products/p4.jpg";
import V1 from "../assets/products/v1.mp4";

const products = [
  { id: 1, name: "Rakhi", price: 25, image: p1 },
  { id: 2, name: "Decorative Candle", price: 15, image: p2 },
  { id: 3, name: "Art Canvas", price: 40, image: p3 },
  { id: 4, name: "Mini Sculpture", price: 30, image: p4 },
  { id: 5, name: "Art", price: 50, image: V1 },
];

export default function Home() {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: 300, behavior: "smooth" });

        // if reached end → go back to start
        if (
          containerRef.current.scrollLeft + containerRef.current.clientWidth >=
          containerRef.current.scrollWidth - 10
        ) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 900); // scroll every 3s

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="italic">
      <Hero />

      {/* Featured Products Slider */}
      <section className="relative w-full py-12" id="featured-products">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          Featured Products
        </h2>

        {/* Arrow Buttons */}
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

        {/* Products Row */}
        <div
          ref={containerRef}
          className="flex w-full overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="flex-shrink-0 w-72 p-2 snap-center"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Other Sections */}
      <AboutWork />
      <Reviews />
      <AboutOwner />
      <Footer />
    </div>
  );
}
