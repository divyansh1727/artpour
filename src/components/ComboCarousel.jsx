import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../components/ProductCard";

const ComboCarousel = ({ products = [], autoPlay = true, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const widthRef = useRef(0);
  const timerRef = useRef(null);

  // Resize listener (for swipe threshold)
  useLayoutEffect(() => {
    const update = () => {
      if (containerRef.current) widthRef.current = containerRef.current.offsetWidth;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (autoPlay && products.length > 1) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, interval);
      return () => clearInterval(timerRef.current);
    }
  }, [currentIndex, autoPlay, interval, products.length]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (_e, info) => {
    const w = widthRef.current || 320;
    const threshold = w * 0.18;
    const { offset, velocity } = info;
    const power = Math.abs(offset.x) + Math.abs(velocity.x) * 25;

    if (offset.x > threshold || (power > threshold && offset.x > 0)) {
      prevSlide();
    } else if (offset.x < -threshold || (power > threshold && offset.x < 0)) {
      nextSlide();
    }
  };

  if (!products.length) return null;

  const product = products[currentIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto overflow-hidden"
      onMouseEnter={() => clearInterval(timerRef.current)} // pause on hover (desktop)
      onMouseLeave={() => {
  if (autoPlay && products.length > 1) {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, interval);
  }
}}
 // resume
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={product.id ?? currentIndex}
          className="p-4 bg-gray-900 rounded-lg shadow-lg text-center"
          custom={direction}
          initial={{ x: direction >= 0 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction >= 0 ? -300 : 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ touchAction: "pan-y" }} // ensures smooth swipe on iPhone/iPad
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg mb-4 select-none pointer-events-none"
            draggable={false}
          />
          <h3 className="text-xl font-semibold text-white">{product.name}</h3>
          <p className="text-gray-400">${product.price}</p>
        </motion.div>
      </AnimatePresence>

      {products.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-6 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition z-10"
            aria-label="Previous"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-6 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition z-10"
            aria-label="Next"
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default ComboCarousel;
