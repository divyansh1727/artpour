import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import AboutWork from "../components/AboutWork";
import Reviews from "../components/Reviews";
import AboutOwner from "../components/AboutOwner";
import Footer from "../components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductsList from "../components/ProductsList";
import { getProducts } from "../api/products";
import { productMedia } from "../data/productMedia";

// helper
const normalizeName = (name) => name?.trim().toLowerCase();

export const mergeMedia = (p) => {
  const key = normalizeName(p.name);
  const media = productMedia[key] || {};

  const allMedia = [
    ...(media.images ?? p.images ?? []),
    ...(media.image ? [media.image] : []),
  ];

  const images = allMedia.filter((x) => !x.endsWith(".mp4"));
  const videos = allMedia.filter((x) => x.endsWith(".mp4"));

  return {
    ...p,
    images: images.length > 0 ? images : null,
    videos: videos.length > 0 ? videos : null,
    image: images[0] ?? null,
    video: videos[0] ?? null,
  };
};
export default function Home() {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data.map(mergeMedia));
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  useEffect(() => {
    if (isPaused || showAllProducts) return;
    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        if (containerRef.current.scrollLeft + containerRef.current.clientWidth >= containerRef.current.scrollWidth - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 1400);
    return () => clearInterval(interval);
  }, [isPaused, showAllProducts]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center py-20 text-lg">Loading beautiful products ✨</p>;
  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;

  return (
    <div>
      <Hero onSearch={setSearchQuery} onExplore={() => setShowAllProducts(true)} />

      <section className="relative w-full py-12" id="featured-products">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          {showAllProducts ? "All Products" : "Featured Products"}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 italic">No products found for "{searchQuery}"</p>
        ) : showAllProducts ? (
          <ProductsList products={filteredProducts} />
        ) : (
          <>
            <button onClick={scrollLeft} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md">
              <ChevronLeft />
            </button>
            <button onClick={scrollRight} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md">
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
  <div key={p._id} className="flex-shrink-0 w-72 p-2 snap-center">
    <ProductCard product={mergeMedia(p)} /> {/* ALWAYS merge */}
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