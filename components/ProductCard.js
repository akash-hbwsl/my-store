import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 m-4 transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {product.title}
      </h3>
      <Image
        src={product.image}
        width={200}
        height={200}
        alt={product.title}
        className="w-full h-48 object-contain rounded-md mb-4 bg-white p-2"
        unoptimized={product.isCustom}
      />
      <p className="text-lg font-bold text-green-600 mb-2">$ {product.price}</p>
      <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
      <Link
        href={`/products/${product.id}`}
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}
