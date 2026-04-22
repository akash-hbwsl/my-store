import Image from "next/image";

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return (
    <div>
      <h1>{product.title}</h1>
      <Image
        src={product.image}
        width={200}
        height={200}
        alt={product.title}
      ></Image>
      <p>${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
