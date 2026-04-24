"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 flex items-center">
          <span className="absolute left-3 flex items-center pointer-events-none h-full">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            className="input-base pl-10 pr-4 py-3 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ height: "48px" }}
          />
        </div>
        <div className="relative w-full md:w-64">
          <select
            className="input-base w-full cursor-pointer appearance-none pl-4 pr-10 py-3 shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </span>
        </div>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="card-surface p-10 text-center text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
