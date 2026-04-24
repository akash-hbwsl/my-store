import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="page-shell flex flex-col items-center justify-center px-4">
      <div className="card-surface w-full max-w-md p-8 text-center shadow-lg">
        <ArrowPathIcon className="mx-auto h-10 w-10 text-blue-500 animate-spin mb-4" />
        <div className="text-lg font-medium text-gray-700 mb-1">
          Loading products...
        </div>
        <div className="text-sm text-gray-400">Please wait a moment.</div>
      </div>
    </div>
  );
}
