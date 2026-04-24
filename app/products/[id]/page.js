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
  console.log(product);

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
              <ProductDetailsClient product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
