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
    <div className="flex flex-col justify-between w-full bg-white border pb-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link
        className=""
        href={`/products/${product.name.split(" ").join("_")}`}>
        <img
          className="object-cover rounded-t-lg h-56 w-full"
          src={product.image}
          alt={product.name}
        />
        <h5 className="p-5 mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
      </Link>
      <div className="p-5 flex flex-col justify-between">
        <button className="text-white bg-blue-700 flex items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <a href={product.link}>View Tab</a>
        </button>
      </div>
    </div>
  );
};

export default PurchasedProductCard;
