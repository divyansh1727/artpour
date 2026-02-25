import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { productMedia } from "../data/productMedia";

// ✅ Normalize name to lowercase + trim
const normalizeName = (name) => name?.trim().toLowerCase();

// ✅ Merge media (images/videos)
export const mergeMedia = (p) => {
  const key = normalizeName(p.name);
  const media = productMedia[key] || {};

  const allMedia = [
    ...(media.images ?? p.images ?? []),
    ...(media.image ? [media.image] : []),
  ];

  const images = allMedia.filter((x) => !x.endsWith(".mp4"));
  const videos = allMedia.filter((x) => x.endsWith(".mp4"));

  return {
    ...p,
    images: images.length > 0 ? images : null,
    videos: videos.length > 0 ? videos : null,
    image: images[0] ?? null,
    video: videos[0] ?? null,
  };
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getProductById(id);
      setProduct(mergeMedia(data));
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddToCart = () => {
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill all fields to add to cart!");
      return;
    }
    setCart([...cart, { ...product, customerInfo: formData }]);
    alert("✅ Product added to cart!");
    setFormData({ name: "", email: "", address: "" });
    setShowModal(false);
  };

  if (!product) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10">
      {/* MEDIA DISPLAY */}
      {product.videos?.[0] ? (
        <video
          src={product.videos[0]}
          className="rounded-xl shadow-md"
          autoPlay
          muted
          loop
        />
      ) : product.images?.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name}-${i}`}
              className="rounded-xl shadow-md"
            />
          ))}
        </div>
      ) : product.image ? (
        <img src={product.image} alt={product.name} className="rounded-xl shadow-md" />
      ) : null}

      {/* INFO */}
      <div>
        <h1 className="text-3xl font-bold text-pink-600">{product.name}</h1>
        <p className="text-xl font-semibold mt-4">₹ {product.price}</p>
        <p className="mt-6 text-gray-600">{product.description}</p>

        <button
          className="mt-8 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
          onClick={() => setShowModal(true)}
        >
          Add to Cart
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-pink-600 mb-4">
              Buy {product.name}
            </h3>

            {/* MEDIA */}
            {product.images?.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name}-${i}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : product.videos?.[0] ? (
              <video
                src={product.videos[0]}
                className="w-full h-40 object-cover rounded-lg mb-3"
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}

            {/* DESCRIPTION */}
            {product.description && (
              <p className="text-gray-600 mb-3">{product.description}</p>
            )}

            {/* FORM */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                disabled={loading}
              >
                {loading ? "Processing..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEBUG CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-pink-600 text-white p-4 rounded-xl shadow-lg">
          Cart: {cart.length} item{cart.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}