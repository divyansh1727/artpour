// src/components/ProductCarousel.jsx
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "./ProductCard";

export default function ProductCarousel({ products = [] }) {
  const swiperRef = useRef(null);

  const pause = () => swiperRef.current?.autoplay?.stop();
  const resume = () => swiperRef.current?.autoplay?.start();

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        spaceBetween={16}
        loop={true}
        speed={600}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // allows swipe + autoplay resume
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
        grabCursor={true} // makes swipe feel natural
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

