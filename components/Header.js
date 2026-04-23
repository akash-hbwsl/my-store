"use client";

import Link from "next/link";
import { useRecent } from "@/context/RecentContext";

export default function Header() {
  const { recent } = useRecent();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2 md:mb-0">
          My Store
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 hover:underline transition-all font-medium px-2 py-1 rounded"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-700 hover:text-blue-600 hover:underline transition-all font-medium px-2 py-1 rounded"
          >
            Products
          </Link>
          <Link
            href="/admin/add-product"
            className="text-gray-700 hover:text-blue-600 hover:underline transition-all font-medium px-2 py-1 rounded"
          >
            Add Product
          </Link>
          <Link
            href="/admin/products"
            className="text-gray-700 hover:text-blue-600 hover:underline transition-all font-medium px-2 py-1 rounded"
          >
            Added Product
          </Link>
          <button className="relative flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition shadow-sm">
            <span className="text-xl">👁️</span>
            <span className="text-sm text-gray-700 font-medium">
              Recently Viewed
            </span>
            {recent.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                {recent.length}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
