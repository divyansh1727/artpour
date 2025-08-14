import  { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import P1 from "../assets/images/p1.jpg";
import P2 from "../assets/images/p2.jpg";
import P3 from "../assets/images/p3.jpg";
import P4 from "../assets/images/p4.jpg";
import P5 from "../assets/images/p5.jpg";


export default function AboutWork() {
  const images = [P1,P2,P3,P4,P5];
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  // Auto-scroll animation
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
    <section className="py-16 px-4 bg-white text-center overflow-hidden">
      <h2 className="text-3xl font-bold text-pink-600 mb-8">About My Work</h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-6">
        PourByKay creates unique handmade art & craft pieces with love and attention to detail. Every product is crafted using premium materials and designed to bring joy and creativity to your space.
      </p>

      {/* Carousel */}
      <div
        className="flex w-full overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={() => setIsPaused(!isPaused)}
      >
        <motion.div
          animate={controls}
          className="flex w-[400%]" // 4 images side by side
        >
          {images.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-full md:w-1/4 p-2">
              <img
                src={img}
                alt={`Art ${idx + 1}`}
                className="w-full h-56 object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

