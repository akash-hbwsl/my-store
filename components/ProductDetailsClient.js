"use client";

import { useEffect } from "react";
import { useRecent } from "@/context/RecentContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetailsClient({ product }) {
  const { addRecent } = useRecent();
  const { addToCart } = useCart();

  useEffect(() => {
    addRecent(product);
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <>
      <h1 className="text-3xl text-black font-bold mb-6">{product.title}</h1>

      <div className="mb-6">
        {product.discount > 0 ? (
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-green-600">
              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${product.price}
            </span>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
              {product.discount}% OFF
            </span>
          </div>
        ) : (
          <p className="text-green-600 text-2xl font-bold mb-4">
            ${product.price}
          </p>
        )}
      </div>

      <p className="text-gray-600 mb-6">{product.description}</p>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Add to Cart
      </button>
    </>
  );
}
