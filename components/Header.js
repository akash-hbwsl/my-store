import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-3xl font-bold text-blue-600">My Store</div>
        <div className="space-x-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 hover:underline transition-all font-medium"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-700 hover:text-blue-600 hover:underline transition-all font-medium"
          >
            Products
          </Link>
          <Link
            href="/admin/add-product"
            className="text-gray-700 hover:text-blue-600 hover:underline transition-all font-medium"
          >
            Add Product
          </Link>
          <Link
            href="/admin/products"
            className="text-gray-700 hover:text-blue-600 hover:underline transition-all font-medium"
          >
            Added Product
          </Link>
        </div>
      </nav>
    </header>
  );
}
