"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { InfinitePageType, ProductType } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InfiniteData } from "@tanstack/react-query";
import { addCart, fetchSingleProductByName } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { CldImage } from "next-cloudinary";
import { useCart } from "@/provider/context/CartContext";
import { ChevronLeftIcon, ShoppingBagIcon } from "lucide-react";

const page = () => {
  const { cartList, removeFromCart } = useCart();
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams() as { name: string };
  const { addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false); // is product in cart list check

  useEffect(() => {
    const find = cartList.find(
      (cartItem) => cartItem.name === params.name.split("_").join(" ")
    );
    setIsInCart(!!find);
  }, [cartList]);

  // get from cache if exists
  const cachedProducts = queryClient.getQueryData([
    "all-products",
  ]) as ProductType[];

  const productName = params.name.split("_").join(" ");

  // check if cache is exist
  let product: ProductType | undefined;
  if (cachedProducts) {
    // find item by product name
    product = cachedProducts.find((item) => item?.name === productName);
  } else {
    const { data, error, isLoading } = useQuery({
      queryKey: [`${productName}`],
      queryFn: () => fetchSingleProductByName(params.name),
    });

    product = data;
    if (isLoading) return <p>single product Loading...</p>;
    if (error) return <p>single product Something weng wrong!</p>;
  }

  async function handleAddToCart() {
    const cartItem = {
      productId: product?._id,
      name: product?.name,
      image: product?.image,
      price: product?.price,
    };
    if (product && !isInCart) {
      addToCart(cartItem);
      return;
    }
    if (isInCart) {
      removeFromCart(cartItem);
      return;
    }
  }

  return (
    <>
      <section className="mt-14 sm:mt-20 py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <button
            className="flex gap-3 mb-7 items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => router.back()}>
            <ChevronLeftIcon width={20} />
            Back
          </button>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                alt=""
              />
              <img
                className="w-full hidden dark:block"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                alt=""
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product?.name}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  Rp. {product?.price}
                </p>
                <div className="flex items-center gap-2 mt-2 sm:mt-5">
                  <p>
                    Difficulty:{" "}
                    <span className="font-bold">{product?.difficulty}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  onClick={handleAddToCart}
                  className="flex gap-3 items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button">
                  <ShoppingBagIcon width={20} />
                  {isInCart ? "Remove" : "Add to cart"}
                </button>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
