import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/admin/add-product">Add Product</Link>
      </nav>
    </header>
  );
}
