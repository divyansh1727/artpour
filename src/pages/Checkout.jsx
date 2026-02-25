import { useCart } from "../context/CartContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    name:""
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

const handleSubmit = async (e) => {
  e.preventDefault();

  const orderData = {
    ...form,
    items: cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    totalAmount: total,
  };

  try {
    await axios.post("https://artpour.onrender.com/api/orders", orderData);

    alert("Order placed!");
    clearCart();
    navigate("/order-success")

    // ✅ WhatsApp message to admin
    const adminPhone = "917838548016";

    let message = `🛒 *New Order Received*\n\n`;
    message += `👤 Name: ${form.customerName}\n`;
    message += `📞 Phone: ${form.phone}\n`;
    message += `📍 Address: ${form.address}\n\n`;
    message += `📦 *Items:*\n`;

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    message += `\n💰 *Total: ₹${total}*`;

    window.open(
      `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

  } catch (err) {
    console.error(err);
    alert("Failed to place order");
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full"
          required
          onChange={(e) =>
            setForm({ ...form, customerName: e.target.value })
          }
        />

        <input
          type="tel"
          placeholder="Phone"
          className="border p-2 w-full"
          required
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <textarea
          placeholder="Address"
          className="border p-2 w-full"
          required
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <div className="font-semibold">
          Total: ₹{total}
        </div>

        <button className="bg-black text-white px-6 py-2">
          Place Order
        </button>
      </form>
    </div>
  );
}