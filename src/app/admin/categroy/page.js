"use client";
import { useState, useEffect } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false); // 👈 for toggling form visibility

  // Fetch all categories
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.data);
      });
  }, []);

  // Add new category
  const addCategory = async (e) => {
    e.preventDefault();
    if (!name) return;

    const res = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      setCategories([result.data, ...categories]);
      setName("");
      setShowForm(false); // 👈 hide form after adding
    } else {
      console.error("Failed to add category:", result.error);
    }
  };

  // Delete a category
  const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const res = await fetch(`/api/category/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (res.ok && result.success) {
      setCategories(categories.filter((c) => c._id !== id));
    } else {
      console.error("Failed to delete category:", result.error);
    }
  };

  return (
    <div className="p-6 text-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>

        {/* Toggle Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {/* Add Category Form (visible when showForm = true) */}
      {showForm && (
        <form
          onSubmit={addCategory}
          className="flex flex-col sm:flex-row gap-2 mb-6 bg-gray-50 p-4 rounded border"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="border px-3 py-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      )}

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Category Name</th>
              <th className="p-3 border">Created At</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((c, idx) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{idx + 1}</td>
                  <td className="p-3 border">{c.name}</td>
                  <td className="p-3 border">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => deleteCategory(c._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
