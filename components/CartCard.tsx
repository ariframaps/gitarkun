"use client";

import { removeProductFromCart } from "@/utils/api";
import { CartProductInfo } from "@/types/types";
import { useCart } from "@/provider/context/CartContext";
import { useShowCart } from "@/provider/context/ShowCartContext";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartCard = ({ item }: { item: CartProductInfo }) => {
  const { setShowCart } = useShowCart();
  const { removeFromCart } = useCart();
  const { userId } = useAuth();

  const { mutate } = useMutation({
    mutationFn: removeProductFromCart,
  });

  function handleRemove() {
    const cartItem = {
      name: item.name,
      image: item.image,
      price: item.price,
    };
    if (userId) {
      mutate({ userId, productId: item.product, price: item.price });
      removeFromCart({ ...cartItem, product: item.product });
    }
  }

  const productUrlPath = item.name?.split(" ").join("_");
  return (
    <li className="flex gap-2 items-center justify-between w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="hidden md:block rounded-md overflow-hidden shadow-md border-2 border-neutral-400">
        <img src={item.image || ""} width={100} height={100} />
      </div>
      <div className="flex-1 ms-0 sm:ms-2">
        <Link href={`/products/${productUrlPath}`}>
          <h5
            onClick={() => setShowCart(false)}
            className="mb-2 text-lg font-semibold text-black cursor-pointer">
            {item.name}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Rp. {item.price}
        </p>
      </div>
      <button
        onClick={handleRemove}
        className="inline-flex gap-3 items-center px-2 md:px-3 py-1 md:py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        Remove
        <TrashIcon width={15} className="hidden md:inline" />
      </button>
    </li>
  );
};

export default CartCard;
