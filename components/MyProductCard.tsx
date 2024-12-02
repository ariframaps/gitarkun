import { deleteProduct } from "@/lib/api";
import { ProductType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
      <div>{product.name}</div>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MyProductCard;
