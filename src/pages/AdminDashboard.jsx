import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// ✅ make sure firebase.js exports db

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    discount: 0,
  });

  // Fetch products from Firestore
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin-login");
    }

    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(list);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert("Name and Price are required");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...newProduct,
        price: Number(newProduct.price),
        discount: Number(newProduct.discount) || 0,
      });
      setProducts((prev) => [...prev, { id: docRef.id, ...newProduct }]);
      setNewProduct({ name: "", price: "", image: "", description: "", discount: 0 });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Update discount
  const handleDiscountChange = async (id, value) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { discount: Number(value) });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, discount: Number(value) } : p
        )
      );
    } catch (err) {
      console.error("Error updating discount:", err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (loading) return <p className="p-8">Loading products...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome Admin 🎉</h1>

      {/* Add Product Form */}
      <div className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <form
          onSubmit={addProduct}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, name: e.target.value }))
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, price: e.target.value }))
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, image: e.target.value }))
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Short Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, description: e.target.value }))
            }
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Discount (%)</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">₹{p.price}</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={p.discount || ""}
                    onChange={(e) =>
                      handleDiscountChange(p.id, e.target.value)
                    }
                    className="w-20 border rounded p-1 text-center"
                    min="0"
                    max="100"
                  />
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          navigate("/admin-login");
        }}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
