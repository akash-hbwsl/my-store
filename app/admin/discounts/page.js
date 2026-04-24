"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminDiscountsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [discountType, setDiscountType] = useState("all");
  const [discountValue, setDiscountValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
  ];

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/login");
      return;
    }

    fetchProducts();
    fetchDiscounts();
  }, [session, status, router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchDiscounts = async () => {
    try {
      const response = await fetch("/api/admin/discounts");
      if (response.ok) {
        const data = await response.json();
        setDiscounts(data.discounts);
      }
    } catch (error) {
      console.error("Failed to fetch discounts:", error);
    } finally {
      setLoadingDiscounts(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleProductChange = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((p) => p !== productId)
        : [...prev, productId],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!discountValue || discountValue <= 0 || discountValue > 100) {
        toast.error("Please enter a valid discount percentage (1-100)");
        setIsLoading(false);
        return;
      }

      const payload = {
        discountType,
        discountValue: parseInt(discountValue),
        categories: discountType === "category" ? selectedCategories : [],
        applicableProducts: discountType === "specific" ? selectedProducts : [],
      };

      const response = await fetch("/api/admin/discounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to apply discount");
      }

      const result = await response.json();
      toast.success("Discount applied successfully!");

      // Reset form
      setDiscountType("all");
      setDiscountValue("");
      setSelectedCategories([]);
      setSelectedProducts([]);

      // Refresh discounts list
      fetchDiscounts();
    } catch (error) {
      console.error("Discount submission error:", error);
      toast.error("Failed to apply discount. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || !session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="page-shell">
      <div className="page-container">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Discount Form */}
        <div className="flex-1">
          <div className="card-surface p-6">
            <h2 className="section-title text-2xl mb-6">
              Add Discount
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Discount Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Apply Discount To
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="all"
                      checked={discountType === "all"}
                      onChange={(e) => setDiscountType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700">All Products</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="category"
                      checked={discountType === "category"}
                      onChange={(e) => setDiscountType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700">
                      Specific Categories
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="specific"
                      checked={discountType === "specific"}
                      onChange={(e) => setDiscountType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700">
                      Specific Products
                    </span>
                  </label>
                </div>
              </div>

              {/* Category Selection */}
              {discountType === "category" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Categories
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Selection */}
              {discountType === "specific" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Products
                  </label>
                  <div className="max-h-96 overflow-y-auto rounded-md border border-gray-300 p-3 space-y-2">
                    {products.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        No products available
                      </p>
                    ) : (
                      products.map((product) => (
                        <label
                          key={product._id}
                          className="flex items-start cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(
                              product._id.toString(),
                            )}
                            onChange={() =>
                              handleProductChange(product._id.toString())
                            }
                            className="w-4 h-4 text-blue-600 mt-1"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {product.title}
                          </span>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Discount Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Percentage *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="input-base pr-8"
                    placeholder="Enter discount percentage"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-500 font-medium">
                    %
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 px-4 disabled:bg-blue-400"
              >
                {isLoading ? "Applying Discount..." : "Apply Discount"}
              </button>
            </form>
          </div>
        </div>

        {/* Recent Discounts */}
        <div className="lg:w-96">
          <div className="card-surface p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Discounts
            </h2>

            {loadingDiscounts ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : discounts.length === 0 ? (
              <p className="text-gray-600 text-sm">No discounts applied yet</p>
            ) : (
              <div className="space-y-3">
                {discounts.slice(0, 5).map((discount) => (
                  <div
                    key={discount._id}
                    className="rounded-lg border bg-gray-50 p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">
                        {discount.value}% OFF
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {discount.type === "all"
                          ? "All Products"
                          : discount.type === "category"
                            ? "Categories"
                            : "Specific"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {new Date(discount.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
