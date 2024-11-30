"use client";

import { ProductCardType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product }: { product: ProductCardType }) => {
  const router = useRouter();
  console.log(product._id);
  console.log(typeof product._id);
  console.log(product);
  function handleClick() {
    const productUrl = product.name.split(" ").join("_");
    router.push(`/products/${productUrl}`);
  }

  return (
    <li className="bg-red-300 cursor-pointer">
      <div onClick={handleClick}>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={200}
        />
        <div>
          <h2>{product.name}</h2>
          <span>{product.price}</span>
        </div>
        <div>
          <span>{product.sellerId}</span>
          <button>
            <Link href={`/products/${product._id}`} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
