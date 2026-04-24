import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col h-full border border-gray-100 hover:shadow-xl transition-all">
      <div className="flex-1 flex flex-col items-center justify-center mb-4">
        <Image
          src={product.image}
          width={220}
          height={220}
          alt={product.title}
          className="w-full h-56 object-contain rounded-xl bg-gray-50 p-4 border"
          unoptimized={product.isCustom}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center line-clamp-2 min-h-[56px]">
        {product.title}
      </h3>
      <p className="text-base text-gray-600 mb-4 text-center line-clamp-2 min-h-[44px]">
        {product.description}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div>
          {product.discount > 0 ? (
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-green-600">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-green-600">
              ${product.price}
            </span>
          )}
        </div>
        <Link
          href={`/products/${product._id}`}
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
