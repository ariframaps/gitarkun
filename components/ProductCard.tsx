import { ProductType } from "@/types/types";
import { ArrowRight, BookIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  const productUrlPath = product.name.split(" ").join("_");
  let totalStartDiff = [];

  switch (product.difficulty) {
    case "Advanced":
      totalStartDiff = [1, 2, 3];
      break;
    case "Intermediate":
      totalStartDiff = [1, 2];
      break;
    case "Beginner":
      totalStartDiff = [1];
      break;
  }

  return (
    <li className="sm:max-w-sm bg-white border border-b-4 border-e-4 border-neutral-600 hover:shadow-xl duration-150 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      <Link href={`/products/${productUrlPath}`}>
        <div className="w-full max-h-52 p-2">
          <img
            className="object-cover rounded-lg w-full max-h-52 border-2 border-neutral-200 shadow"
            src={product.image}
            alt={product.name}
          />
        </div>
        <h5 className=" p-5 mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
      </Link>
      <div className="px-2 py-5 mx-3 flex flex-col justify-between border-t-2">
        <div>
          <p className="mb-2 flex gap-3 text-gray-700 dark:text-gray-400">
            <div className="flex gap-1">
              {totalStartDiff.map((i) => (
                <StarIcon width={15} key={i} />
              ))}
            </div>
            {product.difficulty}
          </p>
          <p className="text-2xl font-mono font-bold text-yellow-600">
            Rp.{product.price}
          </p>
          <Link
            href={`/products/${productUrlPath}`}
            className="mt-5 inline-flex items-center gap-3 px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            See more
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
