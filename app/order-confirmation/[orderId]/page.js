"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch the order details from the API
    // For now, we'll just show the order ID
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div className="page-shell">
        <div className="page-container py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-container py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-6">✅</div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your order. We've received your order and will process
          it shortly.
        </p>

        <div className="card-surface bg-gray-50 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Order ID</h2>
          <p className="text-2xl font-mono text-blue-600">{orderId}</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            You'll receive an email confirmation shortly with your order
            details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="btn-primary"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="btn-secondary"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
