import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate(); // ✅ FIXED

  const total = cart.reduce(
    (sum, p) => sum + (p.price ?? 0) * (p.quantity ?? 1),
    0
  );

  if (cart.length === 0)
    return <p className="text-center py-20">Your cart is empty 😢</p>;

  const handleCartWhatsApp = () => {
    if (!cart.length) return alert("Cart is empty!");
    const phone = "917838548016";
    let text = "*New Purchase*\n\n";

    cart.forEach((p, i) => {
      text += `${i + 1}. ${p.name ?? "Product"} x${p.quantity ?? 1} - ₹${
        (p.price ?? 0) * (p.quantity ?? 1)
      }\n`;
      if (p.customerInfo) {
        text += `Name: ${p.customerInfo.name}\nEmail: ${p.customerInfo.email}\nAddress: ${p.customerInfo.address}\n\n`;
      }
    });

    const encoded = encodeURIComponent(text);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile)
      window.location.href = `whatsapp://send?phone=${phone}&text=${encoded}`;
    else window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((p, idx) => (
          <div
            key={p._id ?? idx}
            className="flex items-start justify-between bg-gray-900 p-4 rounded-lg"
          >
            <img
              src={p.image || p.images?.[0] || ""}
              alt={p.name ?? "Product"}
              className="w-28 h-28 object-cover rounded"
            />

            <div className="flex-1 mx-4">
              <h2 className="text-pink-600 font-bold">
                {p.name ?? "Product"}
              </h2>
              <p className="text-gray-200">₹ {p.price ?? 0}</p>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(
                      p._id ?? "",
                      Math.max(1, (p.quantity ?? 1) - 1)
                    )
                  }
                  className="px-2 py-1 bg-gray-700 rounded"
                >
                  -
                </button>
                <span className="px-2 py-1">{p.quantity ?? 1}</span>
                <button
                  onClick={() =>
                    updateQuantity(p._id ?? "", (p.quantity ?? 1) + 1)
                  }
                  className="px-2 py-1 bg-gray-700 rounded"
                >
                  +
                </button>
              </div>

              {p.customerInfo && (
                <div className="mt-2 text-gray-400 text-sm">
                  <p>
                    <strong>Name:</strong> {p.customerInfo.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {p.customerInfo.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {p.customerInfo.address}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => removeFromCart(p._id ?? "")}
              className="px-4 py-2 bg-red-600 rounded text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-between items-center gap-2">
        <p className="text-xl font-bold">Total: ₹ {total}</p>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => navigate("/checkout")} // ✅ FIXED
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Checkout
          </button>

          <button
            onClick={handleCartWhatsApp}
            className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Buy via WhatsApp
          </button>

          <button
            onClick={clearCart}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}