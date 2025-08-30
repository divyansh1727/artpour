import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import AboutWork from "../components/AboutWork";
import Reviews from "../components/Reviews";
import AboutOwner from "../components/AboutOwner";
import Footer from "../components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductsList from "../components/ProductsList";

// ✅ import centralized products data
import { products } from "../data/products";

export default function Home() {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused || showAllProducts) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: 300, behavior: "smooth" });

        if (
          containerRef.current.scrollLeft + containerRef.current.clientWidth >=
          containerRef.current.scrollWidth - 10
        ) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 1400);

    return () => clearInterval(interval);
  }, [isPaused, showAllProducts]);

  // 🔍 Filter products case-insensitive
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="italic">
      <Hero onSearch={setSearchQuery} onExplore={() => setShowAllProducts(true)} />

      {/* Products Section */}
      <section className="relative w-full py-12" id="featured-products">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          {showAllProducts ? "All Products" : "Featured Products"}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 italic">
            No products found for "{searchQuery}"
          </p>
        ) : showAllProducts ? (
          // 👉 Use shared ProductsList
          <ProductsList products={filteredProducts} />
        ) : (
          // 👉 Existing Slider
          <>
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
              className="flex w-full overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex-shrink-0 w-72 p-2 snap-center"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <AboutWork />
      <Reviews />
      <AboutOwner />
      <Footer />
    </div>
  );
}
