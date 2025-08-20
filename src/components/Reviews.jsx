import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// 📸 Replace with your actual review images
import R1 from "../assets/reviews/r1.jpg";
import R2 from "../assets/reviews/r2.jpg";
import R3 from "../assets/reviews/r3.jpg";
import R4 from "../assets/reviews/r4.jpg";
import R5 from "../assets/reviews/r5.jpg";
import R6 from "../assets/reviews/r6.jpg";


export default function Reviews() {
  const images = [R1, R2, R3, R4, R5, R6];
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-50%"], // scroll half of duplicated set
        transition: { duration: 18, ease: "linear", repeat: Infinity },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <section className="py-16 px-4 bg-gray-50 text-center overflow-hidden">
      <h2 className="text-3xl font-bold text-pink-600 mb-8">Customer Reviews</h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-6">
        Hear what our happy customers have to say about PourByKay!  
        Every smile, every word inspires us to keep creating.
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
            width: `${images.length * 2 * 220}px`, // images × 2 × width
          }}
        >
          {[...images, ...images].map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-[220px] p-2">
              <img
                src={img}
                alt={`Review ${idx + 1}`}
                className="w-full h-56 object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
