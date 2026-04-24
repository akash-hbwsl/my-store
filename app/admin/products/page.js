import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Admin Products - My Product Store",
};

export default async function ProductPage() {
  const res = await fetch("http://localhost:3000/api/admin/products", {
    cache: "no-store",
  });

  const products = await res.json();
  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="mb-8 text-center">
          <h1 className="section-title">Manage Products</h1>
          <p className="section-subtitle">Review and maintain your active catalog.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
