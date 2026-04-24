"use client";

import Link from "next/link";
import { useRecent } from "@/context/RecentContext";
import ProductCard from "@/components/ProductCard";

export default function RecentlyViewedPage() {
  const { recent } = useRecent();

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recently Viewed</h1>
          <p className="text-gray-600 mt-2">
            Quick access to products you opened recently.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex w-fit items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          Browse More Products
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <div className="text-5xl mb-3">👀</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No recently viewed products yet
          </h2>
          <p className="text-gray-600 mb-6">
            Open a product details page and it will appear here.
          </p>
          <Link
            href="/products"
            className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition-colors"
          >
            Go to Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recent.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
