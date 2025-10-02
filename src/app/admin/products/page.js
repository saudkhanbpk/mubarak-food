"use client";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    status: "available",
    quantity: 1,
    weight: "",
    category: "",
    shippingFees: "",
    otherCharges: "",
    discount: "",
  });
  const [editProduct, setEditProduct] = useState(null);

  // ✅ Load categories from API
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []));
  }, []);

  // ✅ Load products from API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
      });
  }, []);

  // ✅ Add or Update Product
  const addOrUpdateProduct = async (e) => {
    e.preventDefault();

    if (editProduct) {
      // Update product
      const res = await fetch(`/api/products/${editProduct}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editProduct ? data.data : p))
        );
        setEditProduct(null);
      }
    } else {
      // Add product
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setProducts([...products, data.data]);
      }
    }

    resetForm();
  };

  // ✅ Handle Form Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Reset Form
  const resetForm = () =>
    setForm({
      image: "",
      title: "",
      description: "",
      price: "",
      status: "available",
      quantity: 1,
      weight: "",
      category: "",
      shippingFees: "",
      otherCharges: "",
      discount: "",
    });

  // ✅ Start editing
  const startEdit = (p) => {
    setForm({ ...p });
    setEditProduct(p._id);
  };

  const cancelEdit = () => {
    resetForm();
    setEditProduct(null);
  };

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  // ✅ Update Quantity
  const updateQuantity = async (id, type) => {
    const product = products.find((p) => p._id === id);
    if (!product) return;

    const updatedQuantity =
      type === "inc" ? product.quantity + 1 : Math.max(0, product.quantity - 1);

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, quantity: updatedQuantity }),
    });
    const data = await res.json();
    if (data.success) {
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? data.data : p))
      );
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Products Management
      </h1>

      {/* Product Form */}
      <form
        onSubmit={addOrUpdateProduct}
        className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
      >
        <div className="flex flex-col gap-2">
          {/* Image */}
          <label className="font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mt-2"
            />
          )}

          {/* Title */}
          <label className="font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Description */}
          <label className="font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Price */}
          <label className="font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Category */}
          <label className="font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <label className="font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>

          {/* Weight */}
          <label className="font-medium text-gray-700">Weight</label>
          <input
            type="text"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="e.g., 1kg, 500g"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Shipping Fees */}
          <label className="font-medium text-gray-700">Shipping Fees</label>
          <input
            type="number"
            name="shippingFees"
            value={form.shippingFees}
            onChange={handleChange}
            placeholder="Enter Shipping Fees"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Other Charges */}
          <label className="font-medium text-gray-700">Other Charges</label>
          <input
            type="number"
            name="otherCharges"
            value={form.otherCharges}
            onChange={handleChange}
            placeholder="Enter Other Charges"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Discount */}
          <label className="font-medium text-gray-700">Discount</label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="Enter Discount (%)"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
            >
              {editProduct ? "Update Product" : "Add Product"}
            </button>
            {editProduct && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded w-full transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Products Table */}
      <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="p-3">Image</th>
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
            <th className="p-3">Price</th>
            <th className="p-3">Shipping</th>
            <th className="p-3">Other Charges</th>
            <th className="p-3">Discount</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Weight</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="12" className="p-4 text-center text-gray-500">
                No products added yet
              </td>
            </tr>
          )}
          {products.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50 transition">
              <td className="p-2">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-2 font-medium">{p.title}</td>
              <td className="p-2">{p.description}</td>
              <td className="p-2">${p.price}</td>
              <td className="p-2">${p.shippingFees || 0}</td>
              <td className="p-2">${p.otherCharges || 0}</td>
              <td className="p-2">{p.discount ? `${p.discount}%` : "0%"}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    p.status === "available" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {p.status === "available" ? "Available" : "Out of Stock"}
                </span>
              </td>
              <td className="p-2 flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(p._id, "dec")}
                  className="px-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  -
                </button>
                {p.quantity}
                <button
                  onClick={() => updateQuantity(p._id, "inc")}
                  className="px-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  +
                </button>
              </td>
              <td className="p-2">{p.weight}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => startEdit(p)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
