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
    <div className="flex flex-col border border-b-4 border-e-4 border-neutral-600 hover:shadow-xl duration-150 justify-between w-full bg-white pb-2 shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="">
        <div className="w-full max-h-52 p-2">
          <img
            className="object-cover rounded-lg h-56 w-full border-2 border-neutral-200 shadow"
            src={product.image}
            alt={product.name}
          />
        </div>
        <h5 className="p-5 my-5 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
      </div>
      <div className="p-5 flex flex-col justify-between">
        <button className="text-white bg-blue-700 flex items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <a href={product.link} className="w-full">
            Download Tab
          </a>
        </button>
      </div>
    </div>
  );
};

export default PurchasedProductCard;
