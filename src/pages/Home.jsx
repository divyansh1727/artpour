import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import AboutWork from "../components/AboutWork";
import Reviews from "../components/Reviews";
import AboutOwner from "../components/AboutOwner";
import Footer from "../components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

// your product imports...
import p1 from "../assets/products/p1.jpg";
import p2 from "../assets/products/p2.jpg";
import V1 from "../assets/products/v1.mp4";
import p7 from "../assets/images/p7.jpg";
import p9 from "../assets/images/p9.jpg";
import p10 from "../assets/images/p10.jpg";
import p11 from "../assets/images/p11.jpg";
import p12 from "../assets/images/p12.jpg";
import p13 from "../assets/images/p13.jpg";
import h1 from "../assets/images/h1.jpg";
import h2 from "../assets/images/h2.jpg";
import h3 from "../assets/images/h3.jpg";
import h4 from "../assets/images/h4.jpg";
import k2 from "../assets/images/k2.jpg";
import k1 from "../assets/images/k1.jpg";
import q1 from "../assets/images/q1.jpg";
import q3 from "../assets/images/q3.jpg";
import q2 from "../assets/images/q2.jpg";

const products = [
  { id: 1, name: "Rakhi", price: 90 ,bulkPrice: 50, image: p1 },
  { id: 2, name: "Customised Photo holder", price: 650, image: p2 },
  { id: 5, name: "Customised Photo keychain", price:250, image: V1 },
  {
    id: 6,
    name: "Spritual Polaroid",
    price: 50,
    image: p7,
    description: "Fridge magnet, dashboard decor",
    descriptionPrice: 100,
    bulkPrice: 60
  },
  {
    id: 20,
    name: "Hamper",
    price: 500,
    description:"customisable",
    images: [h1, h2, h3,h4],
  },
  { id: 7, name: "Customised Phone Cover", price: 250, image: p9 },
  { id: 8, name: "Customised seashell keychain", price: 300, image: p10 },
  { id: 9, name: "Phone Cover", price: 250, image: p11 },
  { id: 10, name: "Phone Charm", price: 200, image: p12},
  { id: 11, name: "Kitchen Resin Tray", price: 1200, image: p13 },
  { id: 12, name: "Bookmark", price: 200, image: k2},
  { id: 13, name: "Phone Charm", price: 200, image: k1},
  { id: 15, name: "Keychain", price: 250, image: q1},
  { id: 16, name: "Dashboard Decor", price: 100, image: q3},
  { id: 17, name: "Love Letter", price: 100, image: q2},
];

export default function Home() {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false); // 👈 new

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused || showAllProducts) return; // 👈 stop auto scroll in grid view

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
          // 👉 Full Grid Layout
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
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
