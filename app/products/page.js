import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Products - My Product Store",
};

export default async function ProductPage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  const products = await res.json();

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="mb-10 text-center">
          <h1 className="section-title">Products</h1>
          <p className="section-subtitle">Discover curated picks and current deals.</p>
        </div>
        <ProductList products={products} />
      </div>
    </div>
  );
}
