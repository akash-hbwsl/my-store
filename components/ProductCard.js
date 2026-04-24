 "use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const hasDiscount = product.discount > 0;
  const discountedPrice = (product.price * (1 - product.discount / 100)).toFixed(2);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <article className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
      <Link
        href={`/products/${product._id}`}
        className="relative block bg-gradient-to-b from-gray-50 to-white p-5 border-b border-gray-100"
      >
        {hasDiscount && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-red-500 text-white text-xs font-semibold px-2.5 py-1 shadow">
            {product.discount}% OFF
          </span>
        )}
        <div className="flex items-center justify-center">
          <Image
            src={product.image}
            width={220}
            height={220}
            alt={product.title}
            className="w-full h-52 object-contain rounded-xl p-3 transition-transform duration-300 group-hover:scale-105"
            unoptimized={product.isCustom}
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product._id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[56px] group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mt-2 mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-xl font-bold text-green-600">${discountedPrice}</span>
                <span className="text-sm text-gray-400 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-green-600">${product.price}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
            <Link
              href={`/products/${product._id}`}
              className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
