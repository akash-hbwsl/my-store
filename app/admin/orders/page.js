"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedDiscountCategory, setSelectedDiscountCategory] = useState("all");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [applyingDiscount, setApplyingDiscount] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/login");
      return;
    }

    fetchOrders();
    fetchCategories();
  }, [session, status, router]);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();

      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      const allCategories = [
        ...new Set(
          (data || [])
            .map((product) => product.category)
            .filter((category) => typeof category === "string" && category.trim()),
        ),
      ];
      setCategories(allCategories);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) return;

      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === orderId
            ? { ...o, status: newStatus, updatedAt: new Date() }
            : o,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyDiscount = async (e) => {
    e.preventDefault();

    const parsedDiscount = Number(discountPercentage);
    if (!Number.isFinite(parsedDiscount) || parsedDiscount < 1 || parsedDiscount > 100) {
      toast.error("Please enter a valid discount percentage between 1 and 100.");
      return;
    }

    setApplyingDiscount(true);
    try {
      const payload = {
        discountType: selectedDiscountCategory === "all" ? "all" : "category",
        discountValue: parsedDiscount,
        categories:
          selectedDiscountCategory === "all" ? [] : [selectedDiscountCategory],
        applicableProducts: [],
      };

      const res = await fetch("/api/admin/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save discount");
      }

      const result = await res.json();
      if (!result.matchedCount) {
        throw new Error("No products matched selected category");
      }

      toast.success("Discount saved and applied to products.");
      setDiscountPercentage("");
      setSelectedDiscountCategory("all");
    } catch (error) {
      console.error(error);
      toast.error("Could not apply discount. Please try again.");
    } finally {
      setApplyingDiscount(false);
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-900";
      case "processing":
        return "bg-blue-100 text-blue-900";
      case "shipped":
        return "bg-purple-100 text-purple-900";
      case "delivered":
        return "bg-indigo-100 text-indigo-900";
      case "completed":
        return "bg-green-100 text-green-900";
      case "cancelled":
        return "bg-red-100 text-red-900";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="page-shell">
        <div className="page-container py-10 text-center text-gray-900">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
        Loading orders...
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") return null;

  return (
    <div className="page-shell">
      <div className="page-container text-gray-900">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="section-title">Orders Management</h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-base w-auto"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 text-gray-900">
          <div className="text-5xl mb-3">📦</div>
          <p className="text-xl font-semibold">No orders found</p>
          <p className="text-gray-600">Try changing filter</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="card-surface p-6"
            >
              {/* TOP ROW */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Order #{order.orderId}
                  </h2>

                  <p className="text-gray-900 font-medium">
                    {order.customerName}
                  </p>

                  <p className="text-gray-700">{order.customerEmail}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="border-t pt-3 mb-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-gray-900">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      {item.discount > 0 && item.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          ${(item.originalPrice * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="mb-4 rounded-lg bg-gray-50 p-3 text-gray-900">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* STATUS UPDATE */}
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Update Status
                </label>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.orderId, e.target.value)
                  }
                  className="input-base mt-2"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* DATE */}
              <p className="text-sm text-gray-700 mt-3">
                Ordered: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="card-surface mt-10 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Quick Discount Settings
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Apply a percentage discount to all products or one selected category.
        </p>

        <form
          onSubmit={handleApplyDiscount}
          className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_auto] gap-4 items-end"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedDiscountCategory}
              onChange={(e) => setSelectedDiscountCategory(e.target.value)}
              className="input-base"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Percentage
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="100"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                className="input-base pr-8"
                placeholder="Enter percentage"
                required
              />
              <span className="absolute right-3 top-2.5 text-gray-500">%</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={applyingDiscount}
            className="btn-primary px-5 py-2.5 font-semibold disabled:bg-blue-400"
          >
            {applyingDiscount ? "Saving..." : "Save Discount"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
