import ProductList from "@/components/ProductList";

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
    <div className="py-8 w-full">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Products
        </h1>
        <ProductList products={products} />
      </div>
    </div>
  );
}
