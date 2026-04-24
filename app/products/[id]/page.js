import Image from "next/image";
import Link from "next/link";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  const product = await res.json();

  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
  };
}

// export async function generateStaticParams() {
//   const res = await fetch("http://localhost:3000/api/products");
//   const products = await res.json();

//   return products.map((product) => ({
//     id: product._id.toString(),
//   }));
// }

export default async function ProductDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  const product = await res.json();

  if (!product) {
    notFound();
  }

  return (
    <div className="page-shell">
      <div className="page-container max-w-5xl">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <span className="text-xl">&larr;</span> Back to Products
        </Link>

        <div className="card-surface rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center">
              <Image
                src={product.image}
                width={350}
                height={350}
                alt={product.title}
                className="w-full max-w-sm h-80 object-contain rounded-xl bg-white p-4"
                unoptimized={product.isCustom}
              />
            </div>

            <div className="flex flex-col justify-center">
              <ProductDetailsClient product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
