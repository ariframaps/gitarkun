import Link from "next/link";
import React from "react";

const PurchasedProductCard = ({
  product,
}: {
  product: {
    name: string;
    image: string;
    category: string;
    link: string;
    isDeleted: boolean;
  };
}) => {
  return (
    <div className="w-full bg-white border pb-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/products/${product.name.split(" ").join("_")}`}>
        <img className="rounded-t-lg" src={product.image} alt={product.name} />
      </Link>
      <div className="p-5 flex flex-col justify-between">
        <Link href={`/products/${product.name.split(" ").join("_")}`}>
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </Link>
        <button className="text-white bg-blue-700 flex items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <a href={product.link}>View Tab</a>
        </button>
      </div>
    </div>
  );
};

export default PurchasedProductCard;
