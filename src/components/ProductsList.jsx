// ProductsList.jsx
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductsList({ products }) {
  if (!products || products.length === 0)
    return <p className="text-center text-white">No products available</p>;

  return (
    <motion.div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } }, // 👈 stagger effect
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
