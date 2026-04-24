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
    <div className="page-shell flex items-center justify-center">
      <div className="card-surface w-full max-w-xl p-10 shadow-xl">
        <h1 className="section-title mb-6 text-center text-blue-700">
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
              className="input-base p-3"
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
              className="input-base min-h-[80px] resize-y p-3"
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
                className="input-base p-3"
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
                className="input-base p-3"
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
              className="input-base p-3"
            />
          </div>
          <button className="btn-primary mt-2 py-3 font-semibold">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
