import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard"; // ✅ make sure path is correct

const ComboCarousel = ({ products = [], autoPlay = true, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const containerRef = useRef(null);
  const widthRef = useRef(0);
  const timerRef = useRef(null);

  // Resize listener (for swipe threshold)
  useLayoutEffect(() => {
    const update = () => {
      if (containerRef.current) {
        widthRef.current = containerRef.current.offsetWidth;
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ---- AUTOPLAY HELPERS ----
  const pauseAuto = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAuto = () => {
    if (!autoPlay || products.length <= 1 || timerRef.current) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, interval);
  };

  // Start autoplay once; clean on unmount
  useEffect(() => {
    startAuto();
    return pauseAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, interval, products.length]);

  // ---- NAVIGATION ----
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  // ---- DRAG HANDLING ----
  const handleDragEnd = (_e, info) => {
    const w = widthRef.current || 320;
    const threshold = w * 0.15; // ✅ smaller threshold for tap vs swipe
    const dx = info.offset.x;

    if (Math.abs(dx) < threshold) {
      // ✅ treat as a click → don’t change slide
      startAuto();
      return;
    }

    if (dx > 0) {
      prevSlide();
    } else {
      nextSlide();
    }

    startAuto();
  };

  if (!products.length) return null;
  const product = products[currentIndex];

  // ---- BUTTON HANDLERS ----
  const handlePrevClick = () => {
    pauseAuto();
    prevSlide();
    startAuto();
  };

  const handleNextClick = () => {
    pauseAuto();
    nextSlide();
    startAuto();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto overflow-hidden"
      onMouseEnter={pauseAuto}
      onMouseLeave={startAuto}
      onTouchStart={pauseAuto}
      onTouchEnd={startAuto}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={product.id ?? currentIndex}
          className="p-4 bg-gray-900 rounded-lg shadow-lg text-center cursor-grab"
          custom={direction}
          initial={{ x: direction >= 0 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction >= 0 ? -300 : 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ touchAction: "pan-y" }} // ✅ allows vertical scroll on mobile
        >
          <ProductCard
            product={product}
            pauseCarousel={(paused) => {
              if (paused) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              } else if (autoPlay && products.length > 1) {
                timerRef.current = setInterval(nextSlide, interval);
              }
            }}
          />
        </motion.div>
      </AnimatePresence>

      {products.length > 1 && (
        <>
          <button
            onClick={handlePrevClick}
            className="absolute top-1/2 -left-6 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition z-10"
            aria-label="Previous"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={handleNextClick}
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
