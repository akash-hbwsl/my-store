"use client";

import Link from "next/link";
import { useRecent } from "@/context/RecentContext";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { recent } = useRecent();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "admin";

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2 md:mb-0">
          My Store
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Products
          </Link>

          {isAdmin && (
            <>
              <Link
                href="/admin/add-product"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Add Product
              </Link>

              <Link
                href="/admin/products"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Added Products
              </Link>

              <Link
                href="/admin/orders"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Orders
              </Link>
            </>
          )}

          <button className="relative flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition shadow-sm">
            <span className="text-xl">👁️</span>
            {recent.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                {recent.length}
              </span>
            )}
          </button>

          {!session ? (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="text-gray-700 text-sm">{session.user.name}</span>

              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
