import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="page-shell flex flex-col items-center justify-center px-4">
      <div className="card-surface w-full max-w-lg p-10 text-center shadow-xl">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          404 - Not Found
        </h1>
        <p className="mb-6 text-gray-500 text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/products"
          className="btn-primary font-semibold"
        >
          Go to Products
        </Link>
      </div>
    </div>
  );
}
