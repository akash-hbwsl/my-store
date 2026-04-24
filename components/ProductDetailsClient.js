"use client";

import { useEffect } from "react";
import { useRecent } from "@/context/RecentContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProductDetailsClient({ product }) {
  const { addRecent } = useRecent();
  const { addToCart } = useCart();
  const hasDiscount = product.discount > 0;
  const discountedPrice = (product.price * (1 - product.discount / 100)).toFixed(2);

  useEffect(() => {
    addRecent(product);
  }, [addRecent, product]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600 mb-2">{product.category}</p>
        <h1 className="text-3xl text-gray-900 font-bold leading-tight">{product.title}</h1>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        {hasDiscount ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-green-600">${discountedPrice}</span>
            <span className="text-lg text-gray-500 line-through">${product.price}</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold tracking-wide">
              {product.discount}% OFF
            </span>
          </div>
        ) : (
          <p className="text-green-600 text-3xl font-bold">${product.price}</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Product Description</h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow"
        >
          Add to Cart
        </button>
        <Link
          href="/cart"
          className="inline-flex items-center justify-center border border-blue-200 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
}
