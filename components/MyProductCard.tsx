import { deleteProduct } from "@/utils/api";
import { ProductType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export type UpdateProductPayload = {
  productId: string;
};

const MyProductCard = ({ product }: { product: ProductType }) => {
  const [openModal, setOpenModal] = useState(false);
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
    <div className="flex w-full">
      <div className="border border-b-4 border-e-4 border-neutral-600 hover:shadow-xl duration-150 flex flex-col w-full justify-between bg-white shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={`/products/${product.name.split(" ").join("_")}`}>
          <div className="w-full max-h-52 p-2">
            <img
              className="rounded-t-lg w-full max-h-52 border-2 border-neutral-200 shadow"
              src={product.image}
              alt={product.name}
            />
          </div>
        </Link>
        <div className="p-5 flex gap-5 flex-col">
          <Link href={`/products/${product.name.split(" ").join("_")}`}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </Link>
          <p className="mb-3 text-2xl font-mono font-bold text-yellow-600">
            Rp. {product.price}
          </p>
          <>
            <button
              onClick={() => setOpenModal(true)}
              className="w-max px-3 bg-red-900 hover:bg-red-700 text-white flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-none text-smpy-2 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Delete
            </button>

            <Modal
              show={openModal}
              size="md"
              onClose={() => setOpenModal(false)}
              popup
              className="h-screen flex items-center justify-center bg-black/65 transition-opacity">
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      onClick={() => {
                        setOpenModal(false);
                        handleDelete();
                      }}>
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};

export default MyProductCard;
