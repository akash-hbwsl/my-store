import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Products - My Product Store",
};

export default async function ProductPage() {
  const apiRes = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  const apiProducts = await apiRes.json();
  const localRes = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const localProducts = await localRes.json();
  const products = [...apiProducts, ...localProducts];
  return (
    <div className="py-10 w-full bg-gray-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
          Products
        </h1>
        <ProductList products={products} />
      </div>
    </div>
  );
}
