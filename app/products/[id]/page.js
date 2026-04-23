import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const apiProducts = await res.json();

  const localRes = await fetch("http://localhost:3000/api/products");
  const localProducts = await localRes.json();

  const products = [...apiProducts, ...localProducts];

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetails({ params }) {
  const { id } = await params;
  let product = null;
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (data) {
      product = data;
    }
  } catch (err) {}

  if (!product) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });
    product = await res.json();
  }

  return (
    <div className="py-10 w-full bg-gray-50 min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <span className="text-xl">&larr;</span> Back to Products
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 tracking-tight line-clamp-1">
            {product.title}
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src={product.image}
                width={350}
                height={350}
                alt={product.title}
                className="w-full max-w-xs h-80 object-contain rounded-lg border bg-white p-4"
                unoptimized={product.isCustom}
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="text-2xl font-bold text-green-600 mb-4">
                ${product.price}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-2 line-clamp-3">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
