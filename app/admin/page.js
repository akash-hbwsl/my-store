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
        <a href="/admin/orders">Orders</a>
        <a href="/admin/products">Products</a>
      </div>
    </div>
  );
}
