// ProductsList.jsx
import ProductCard from "./ProductCard";

export default function ProductsList({ products }) {
  if (!products || products.length === 0)
    return <p className="text-center text-white">No products available</p>;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
