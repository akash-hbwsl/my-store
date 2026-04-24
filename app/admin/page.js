import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    return <div className="text-center py-10">Access Denied</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-6">
        <a
          href="/admin/orders"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Orders
        </a>
        <a
          href="/admin/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Products
        </a>
        <a
          href="/admin/discounts"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Discounts
        </a>
      </div>
    </div>
  );
}
