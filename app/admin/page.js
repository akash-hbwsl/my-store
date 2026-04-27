import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    return (
      <div className="py-10 text-center text-slate-700">Access Denied</div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <h1 className="section-title mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/admin/orders"
            className="card-surface p-5 hover:border-blue-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">Orders</h2>
            <p className="mt-1 text-sm text-slate-600">
              Manage order status and processing.
            </p>
          </Link>
          <Link
            href="/admin/products"
            className="card-surface p-5 hover:border-blue-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">Products</h2>
            <p className="mt-1 text-sm text-slate-600">
              Review and curate catalog items.
            </p>
          </Link>
          <Link
            href="/admin/discounts"
            className="card-surface p-5 hover:border-blue-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">Discounts</h2>
            <p className="mt-1 text-sm text-slate-600">
              Create and monitor promotions.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
