"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRecent } from "@/context/RecentContext";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { recent } = useRecent();
  const { data: session } = useSession();
  const { getCartItemCount } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isAdmin = session?.user?.role === "admin";
  const cartCount = getCartItemCount();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="page-container flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="leading-tight">
          <p className="text-2xl font-bold tracking-tight text-blue-600">My Store</p>
          <p className="text-xs text-slate-500">Modern shopping experience</p>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="rounded-md px-2 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="rounded-md px-2 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"
          >
            Products
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <span className="text-xl">🛒</span>
            <span className="text-sm font-medium">Cart</span>
            {isHydrated && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </Link>

          {isAdmin && (
            <>
              <Link
                href="/admin/add-product"
                className="rounded-md px-2 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"
              >
                Add Product
              </Link>

              <Link
                href="/admin/products"
                className="rounded-md px-2 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"
              >
                Added Products
              </Link>

              <Link
                href="/admin/orders"
                className="rounded-md px-2 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"
              >
                Orders
              </Link>
            </>
          )}

          <Link
            href="/recently-viewed"
            className="relative flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <span className="text-xl">👁️</span>
            <span className="text-sm font-medium">Recent</span>
            {isHydrated && recent.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                {recent.length}
              </span>
            )}
          </Link>

          {!session ? (
            <Link
              href="/login"
              className="btn-primary px-4 py-2 text-sm"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="text-sm text-slate-700">{session.user.name}</span>

              <button
                onClick={() => signOut()}
                className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
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
