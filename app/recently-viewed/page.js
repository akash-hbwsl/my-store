"use client";

import Link from "next/link";
import { useRecent } from "@/context/RecentContext";
import ProductCard from "@/components/ProductCard";

export default function RecentlyViewedPage() {
  const { recent } = useRecent();

  return (
    <div className="page-shell">
      <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <h1 className="section-title">Recently Viewed</h1>
          <p className="section-subtitle">
            Quick access to products you opened recently.
          </p>
        </div>
        <Link
          href="/products"
          className="btn-primary w-fit"
        >
          Browse More Products
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="card-surface border-dashed border-slate-300 p-12 text-center">
          <div className="text-5xl mb-3">👀</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No recently viewed products yet
          </h2>
          <p className="text-gray-600 mb-6">
            Open a product details page and it will appear here.
          </p>
          <Link
            href="/products"
            className="btn-primary"
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
    </div>
  );
}
