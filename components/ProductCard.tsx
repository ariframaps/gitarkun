import { ProductCardType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: ProductCardType }) => {
  return (
    <li className="bg-red-300">
      <Link href={`/products/${product.id}`}>
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
            <Link href={`/products/${product.id}`} />
          </button>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
