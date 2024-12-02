import { CartProductInfo, ProductType } from "@/lib/types";
import { useCart } from "@/provider/context/CartContext";
import { TrashIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartCard = ({ item }: { item: CartProductInfo }) => {
  const { removeFromCart } = useCart();
  const productUrlPath = item.name?.split(" ").join("_");
  return (
    <li className="flex items-center justify-between w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <img src={item.image || ""} width={100} height={100} />
      </div>
      <div>
        <Link href={`/products/${productUrlPath}`}>
          <h5 className="mb-2 text-lg font-semibold text-black cursor-pointer">
            {item.name}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Rp. {item.price}
        </p>
      </div>
      <button
        onClick={() => removeFromCart(item)}
        className="inline-flex gap-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        Remove
        <TrashIcon width={15} />
      </button>
    </li>
  );
};

export default CartCard;
