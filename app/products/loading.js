import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-gray-100">
        <ArrowPathIcon className="mx-auto h-10 w-10 text-blue-500 animate-spin mb-4" />
        <div className="text-lg font-medium text-gray-700 mb-1">
          Loading products...
        </div>
        <div className="text-sm text-gray-400">Please wait a moment.</div>
      </div>
    </div>
  );
}
