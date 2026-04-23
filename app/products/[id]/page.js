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
    <div className="py-8 w-full">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/products"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          &larr; Back to Products
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            {product.title}
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            <Image
              src={product.image}
              width={400}
              height={400}
              alt={product.title}
              className="w-full md:w-1/2 h-96 object-contain rounded-lg"
              unoptimized={product.isCustom}
            />
            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="text-3xl font-bold text-green-600 mb-4">
                ${product.price}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
