"use client";

import { useEffect } from "react";
import { useRecent } from "@/context/RecentContext";

export default function ProductDetailsClient({ product }) {
  const { addRecent } = useRecent();

  useEffect(() => {
    addRecent(product);
  }, [product]);

  return (
    <>
      <h1 className="text-3xl text-black font-bold mb-6">{product.title}</h1>

      <p className="text-green-600 text-xl mb-4">${product.price}</p>

      <p className="text-gray-600">{product.description}</p>
    </>
  );
}
