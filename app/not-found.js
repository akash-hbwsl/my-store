import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center border border-gray-100">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          404 - Not Found
        </h1>
        <p className="mb-6 text-gray-500 text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all"
        >
          Go to Products
        </Link>
      </div>
    </div>
  );
}
