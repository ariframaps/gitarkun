import { deleteProduct } from "@/lib/api";
import { ProductType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export type UpdateProductPayload = {
  productId: string;
};

const MyProductCard = ({ product }: { product: ProductType }) => {
  const queryClient = useQueryClient();
  const handleEdit = () => {};

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deletedProduct) => {
      queryClient.setQueryData(["my-product"], (oldProducts: ProductType[]) => {
        return oldProducts.map((product) =>
          product._id === deletedProduct.result._id
            ? { ...product, isDeleted: true } // Update the price
            : product
        );
      });
    },
  });

  const handleDelete = async () => {
    if (typeof product._id !== "undefined") mutate({ productId: product._id });
  };

  return (
    <div className="flex">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={`/products/${product.name.split(" ").join("_")}`}>
          <img
            className="rounded-t-lg"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <div className="p-5">
          <Link href={`/products/${product.name.split(" ").join("_")}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.price}
          </p>
          <button
            onClick={handleDelete}
            className="text-white bg-blue-700 flex items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProductCard;
