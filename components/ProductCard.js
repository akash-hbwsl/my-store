import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.title}</h3>
      <Image
        src={product.image}
        width={100}
        height={100}
        alt={product.title}
      ></Image>
      <p>$ {product.price}</p>
      <p>{product.description}</p>
      <Link href={`/products/${product.id}`}>View Details</Link>
    </div>
  );
}
