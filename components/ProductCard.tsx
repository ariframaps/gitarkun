import { ProductType } from "@/types/types";
import { BookIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  const productUrlPath = product.name.split(" ").join("_");

  return (
    <li className="sm:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      <Link href={`/products/${productUrlPath}`}>
        <img
          className="object-cover rounded-t-lg w-full max-h-52"
          src={product.image}
          alt={product.name}
        />
        <h5 className=" p-5 mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
      </Link>
      <div className="p-5 flex flex-col justify-between ">
        <div>
          <p className="mb-2 flex gap-3 text-gray-700 dark:text-gray-400">
            <StarIcon width={15} />
            {product.difficulty}
          </p>
          <p className="font-semibold text-xl">Rp. {product.price}</p>
          <Link
            href={`/products/${productUrlPath}`}
            className="mt-5 inline-flex items-center gap-3 px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            See more
            <BookIcon />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
