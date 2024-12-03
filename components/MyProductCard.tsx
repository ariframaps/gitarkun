import { deleteProduct } from "@/lib/api";
import { ProductType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export type UpdateProductPayload = {
  productId: string;
};

const MyProductCard = ({ product }: { product: ProductType }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deletedProduct) => {
      queryClient.setQueryData(["my-product"], (oldProducts: ProductType[]) => {
        return oldProducts.map((product) =>
          product._id === deletedProduct.result._id
            ? { ...product, isDeleted: true } // update the price
            : product
        );
      });
    },
  });

  const handleDelete = async () => {
    if (typeof product._id !== "undefined") {
      mutate({ productId: product._id });
      router.prefetch("/dashboard/my-products");
    }
  };

  return (
    <div className="flex">
      <div className="max-w-sm flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={`/products/${product.name.split(" ").join("_")}`}>
          <img
            className="rounded-t-lg"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <div className="p-5 flex gap-5 flex-col">
          <Link href={`/products/${product.name.split(" ").join("_")}`}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400">
            Rp. {product.price}
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
