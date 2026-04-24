"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const { data: session } = useSession();

  const total = getCartTotal();

  const handleQuantityChange = (_id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(_id, newQuantity);
  };

  const handleRemoveItem = (_id, title) => {
    removeFromCart(_id);
    toast.success(`${title} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
          </p>
          <Link
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 text-gray-900">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => {
              const discountedPrice =
                item.discount > 0
                  ? item.price * (1 - item.discount / 100)
                  : item.price;

              const itemTotal = discountedPrice * item.quantity;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md p-6 border"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="mb-3">
                        {item.discount > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold text-green-700">
                              ${discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                              {item.discount}% OFF
                            </span>
                          </div>
                        ) : (
                          <span className="text-base font-semibold text-gray-800">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            -
                          </button>

                          <span className="w-12 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right ml-auto">
                          {item.discount > 0 ? (
                            <div>
                              <span className="text-lg font-bold text-gray-900">
                                ${itemTotal.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              ${itemTotal.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleRemoveItem(item._id, item.title)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-lg shadow-md p-6 border sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Items ({items.length})</span>
                <span className="font-semibold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">Free</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span className="font-semibold text-gray-900">
                  ${(total * 0.08).toFixed(2)}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>

            {session ? (
              <Link
                href="/checkout"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center block"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600 text-sm text-center">
                  Please sign in to checkout
                </p>
                <Link
                  href="/login"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center block"
                >
                  Sign In to Checkout
                </Link>
              </div>
            )}

            <Link
              href="/products"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 px-4 rounded-lg font-medium text-center block mt-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
