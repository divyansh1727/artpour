// ProductsList.jsx
import ProductCard from "./ProductCard";

export default function ProductsList({ products }) {
  if (!products || products.length === 0)
    return <p className="text-center text-white">No products available</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
