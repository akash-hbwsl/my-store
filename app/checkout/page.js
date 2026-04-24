"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    paymentMethod: "cod",
  });

  const total = getCartTotal();
  const tax = total * 0.08;
  const finalTotal = total + tax;

  // ✅ FIX: set email AFTER session loads
  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email,
      }));
    }
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderData = {
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
        items: items.map((item) => ({
          productId: item._id,
          title: item.title,
          originalPrice: item.price,
          discount: item.discount || 0,
          price:
            item.discount > 0
              ? item.price * (1 - item.discount / 100)
              : item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: total,
        tax,
        total: finalTotal,
        status: "pending",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Order failed");

      const result = await response.json();

      clearCart();
      toast.success("Order placed successfully!");

      router.push(`/order-confirmation/${result.orderId}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔒 safer redirects
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-8 text-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>

            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-3 py-2 mb-4 border rounded-md bg-gray-100 text-gray-900"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name"
                required
                onChange={handleInputChange}
                className="border p-2 rounded text-gray-900"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                required
                onChange={handleInputChange}
                className="border p-2 rounded text-gray-900"
              />
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Shipping Address
            </h2>

            <input
              name="address"
              placeholder="Address"
              required
              onChange={handleInputChange}
              className="w-full border p-2 mb-3 rounded text-gray-900"
            />

            <div className="grid grid-cols-3 gap-3">
              <input
                name="city"
                placeholder="City"
                className="border p-2 rounded text-gray-900"
                onChange={handleInputChange}
              />
              <input
                name="state"
                placeholder="State"
                className="border p-2 rounded text-gray-900"
                onChange={handleInputChange}
              />
              <input
                name="zipCode"
                placeholder="ZIP"
                className="border p-2 rounded text-gray-900"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Payment
            </h2>

            <label className="flex items-center text-gray-900">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked
                readOnly
              />
              <span className="ml-2 font-medium">Cash on Delivery</span>
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {isLoading
              ? "Placing Order..."
              : `Place Order - $${finalTotal.toFixed(2)}`}
          </button>
        </form>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow-md border h-fit sticky top-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">
            {items.map((item) => {
              const price =
                item.discount > 0
                  ? item.price * (1 - item.discount / 100)
                  : item.price;

              return (
                <div
                  key={item._id}
                  className="flex justify-between text-gray-900"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <div className="text-right">
                    <div className="font-semibold">
                      ${(price * item.quantity).toFixed(2)}
                    </div>
                    {item.discount > 0 && (
                      <div className="text-xs text-gray-500 line-through">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="my-4" />

          <div className="space-y-2 text-gray-900">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
