import { ProductType } from "@/lib/types";
import {
  BookIcon,
  BookTextIcon,
  ChevronsLeftRight,
  StarIcon,
} from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <li className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/products/${product._id}`}>
        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </Link>
      <div className="p-5 flex flex-col justify-between h-full">
        <Link href={`/products/${product._id}`} className="mb-10">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </Link>
        <div>
          <p className="mb-2 flex gap-3 font-semibold text-gray-700 dark:text-gray-400">
            <StarIcon width={15} />
            {product.difficulty}
          </p>
          <p className="font-semibold text-xl">Rp. {product.price}</p>
          <Link
            href={`/products/${product._id}`}
            className="mt-5 inline-flex items-center gap-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            See more
            <BookIcon />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
