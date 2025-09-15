// ProductsList.jsx
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductsList({ products }) {
  if (!products || products.length === 0)
    return <p className="text-center text-white">No products available</p>;

  return (
    <motion.div
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      initial="show"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {opacity: 1},
        show: { transition: { staggerChildren: 0.15 } }, // 👈 stagger effect
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}