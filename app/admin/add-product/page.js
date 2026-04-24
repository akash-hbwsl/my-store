"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          discount: 0,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Product added successfully!");
        setForm({
          title: "",
          description: "",
          price: "",
          category: "",
          image: "",
        });
      } else {
        toast.error("Failed to add product: " + data.error);
      }
    } catch (err) {
      toast.error("An error occurred: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 w-full bg-gray-50 min-h-[60vh]">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">
          Add Product
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition placeholder-gray-400 text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition min-h-[80px] resize-y placeholder-gray-400 text-gray-900"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">
                Price
              </label>
              <input
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition placeholder-gray-400 text-gray-900"
                type="number"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition placeholder-gray-400 text-gray-900"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition placeholder-gray-400 text-gray-900"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition-all mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
