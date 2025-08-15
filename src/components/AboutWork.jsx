import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import P1 from "../assets/images/p1.jpg";
import P3 from "../assets/images/p3.jpg";
import P4 from "../assets/images/p4.jpg";
import P5 from "../assets/images/p5.jpg";
import P6 from "../assets/images/p6.jpg";
import P7 from "../assets/images/p7.jpg";
import P8 from "../assets/images/p8.jpg";
import P9 from "../assets/images/p9.jpg";
import P10 from "../assets/images/p10.jpg";
import P11 from "../assets/images/p11.jpg";
import P12 from "../assets/images/p12.jpg";
import P13 from "../assets/images/p13.jpg";
import P14 from "../assets/images/p14.jpg";

export default function AboutWork() {
  const images = [P1, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14];
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-50%"], // scroll only half the duplicated set
        transition: { duration: 18, ease: "linear", repeat: Infinity },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <section className="py-16 px-4 bg-white text-center overflow-hidden">
      <h2 className="text-3xl font-bold text-pink-600 mb-8">About My Work</h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-6">
        PourByKay creates unique handmade art & craft pieces with love and attention to detail.
        Every product is crafted using premium materials and designed to bring joy and creativity to your space.
      </p>

      {/* Carousel */}
      <div
        className="w-full overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={() => setIsPaused(!isPaused)}
      >
        <motion.div
          animate={controls}
          className="flex"
          style={{
            width: `${images.length * 2 * 220}px`, // 14 images × 2 × 220px each
          }}
        >
          {[...images, ...images].map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-[220px] p-2">
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
