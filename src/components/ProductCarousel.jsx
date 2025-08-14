// src/components/ProductCarousel.jsx
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import { useSwipeable } from "react-swipeable";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "./ProductCard";

export default function ProductCarousel({ products = [] }) {
  const swiperRef = useRef(null);

  const pause = () => swiperRef.current?.autoplay?.stop();
  const resume = () => swiperRef.current?.autoplay?.start();

  // Fallback swipe handlers (works for mouse + touch)
  const handlers = useSwipeable({
    onSwipedLeft: () => swiperRef.current?.slideNext?.(),
    onSwipedRight: () => swiperRef.current?.slidePrev?.(),
    trackMouse: true,                    // enables mouse-drag on desktop
    preventDefaultTouchmoveEvent: true,  // keeps gesture clean
  });

  return (
    <div
      className="w-full select-none"
      style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" }}
      {...handlers}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        spaceBetween={16}
        loop={true}
        speed={600}
        allowTouchMove={true}
        simulateTouch={true}
        grabCursor={true}
        threshold={5}  // small drag needed to trigger swipe
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // resume autoplay after swipe
          pauseOnMouseEnter: true,     // hover pause on desktop
        }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-8"
      >
        {products.map((p, idx) => (
          <SwiperSlide key={p.id || idx} className="!h-auto flex">
            <div className="w-full">
              <ProductCard
                product={p}
                onPauseAutoplay={pause}
                onResumeAutoplay={resume}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

