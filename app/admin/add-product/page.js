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
        body: JSON.stringify(form),
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
    <div className="flex items-center justify-center py-8 w-full">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Add Product
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition placeholder-gray-500 placeholder-opacity-100 text-gray-900"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition min-h-[80px] resize-y placeholder-gray-500 placeholder-opacity-100 text-gray-900"
            required
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition placeholder-gray-500 placeholder-opacity-100 text-gray-900"
            type="number"
            min="0"
            step="0.01"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition placeholder-gray-500 placeholder-opacity-100 text-gray-900"
            required
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition placeholder-gray-500 placeholder-opacity-100 text-gray-900"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition-all mt-2">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
