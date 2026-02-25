import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api/products";
import { productMedia } from "../data/productMedia";
import { useCart } from "../context/CartContext";

// Normalize product name
const normalizeName = (name) => name?.trim().toLowerCase();

// Merge media with productMedia
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
    images: images.length ? images : null,
    videos: videos.length ? videos : null,
    image: images[0] ?? null,
    video: videos[0] ?? null,
  };
};

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getProductById(id);
      setProduct(mergeMedia(data));
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

 // REMOVE: const [cart, setCart] = useState([]); // <- delete this line

const handleAddToCart = () => {
  if (!formData.name || !formData.email || !formData.address)
    return alert("Fill all fields!");

  // ✅ Add to global cart context
  addToCart(product, quantity, formData);

  alert(`✅ ${quantity} item(s) added to cart!`);
  setFormData({ name: "", email: "", address: "" });
  setQuantity(1);
  setShowModal(false);
};

  const handleBuyWhatsApp = () => {
    if (!formData.name || !formData.email || !formData.address)
      return alert("Fill all fields!");
    const phoneNumber = "917838548016";
    const text = `*New Purchase*\n\nProduct: ${product.name}\nQuantity: ${quantity}\nPrice: ₹${product.price}\n\nCustomer Info:\nName: ${formData.name}\nEmail: ${formData.email}\nAddress: ${formData.address}`;
    const encoded = encodeURIComponent(text);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile)
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encoded}`;
    else window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
    alert("✅ Order sent to WhatsApp!");
    setFormData({ name: "", email: "", address: "" });
    setQuantity(1);
    setShowModal(false);
  };

  if (!product) return <p className="text-center py-20 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
      {/* MEDIA */}
      <div className="space-y-3">
        {product.videos?.[0] ? (
          <video
            src={product.videos[0]}
            className="rounded-xl shadow-lg w-full h-96 object-cover"
            autoPlay
            muted
            loop
          />
        ) : product.images?.length ? (
          <div className="grid grid-cols-2 gap-3">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name}-${i}`}
                className="rounded-xl shadow-lg w-full h-52 md:h-72 object-cover"
              />
            ))}
          </div>
        ) : product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-lg w-full h-96 object-cover"
          />
        ) : null}
      </div>

      {/* PRODUCT INFO */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-pink-600">{product.name}</h1>
          <p className="text-2xl font-semibold mt-4 text-gray-800">₹ {product.price}</p>
          {product.description && <p className="mt-4 text-gray-600">{product.description}</p>}
          {product.longDescription && <p className="mt-2 text-gray-500">{product.longDescription}</p>}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="px-4 py-2 border rounded-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Buy Now
            </button>
          </div>

          <button
            className="mt-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-11/12 md:w-96 max-w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-pink-600 mb-4">{product.name}</h3>

            {/* MEDIA */}
            {product.images?.length ? (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name}-${i}`}
                    className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            ) : product.videos?.[0] ? (
              <video
                src={product.videos[0]}
                className="w-full h-52 md:h-64 object-cover rounded-lg mb-4"
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 md:h-64 object-cover rounded-lg mb-4"
              />
            )}

            {/* DESCRIPTION */}
            {product.description && <p className="text-gray-700 mb-2">{product.description}</p>}
            {product.longDescription && <p className="text-gray-500 mb-4">{product.longDescription}</p>}

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

            <div className="flex justify-end gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyWhatsApp}
                className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
              >
                Buy via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <Link
            to="/cart"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            View Cart ({cart.length})
          </Link>
        </div>
      )}
    </div>
  );
}