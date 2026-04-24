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
    <div className="py-8 w-full">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
