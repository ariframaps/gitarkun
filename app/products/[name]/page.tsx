"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductType } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCart,
  fetchSingleProductByName,
  removeProductFromCart,
} from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useCart } from "@/provider/context/CartContext";
import { ChevronLeftIcon, ShoppingBagIcon } from "lucide-react";

export type AddCartPayload = {
  userId: string | undefined | null;
  cartItem: {
    productId: string | undefined;
    name: string | undefined;
    image: string | undefined;
    price: number | undefined;
  };
};
const Page = () => {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams() as { name: string };
  const productName = params.name.split("_").join(" ");
  const { addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false); // is product in cart list check
  const { isSignedIn, userId } = useAuth();

  const { mutate } = useMutation({
    mutationFn: addCart,
  });

  const { mutate: andrewTate } = useMutation({
    mutationFn: removeProductFromCart,
    onSuccess: () => {},
  });

  const cachedProducts = queryClient.getQueryData([
    "all-products",
  ]) as ProductType[];

  const {
    data: productData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`${productName}`],
    queryFn: () => fetchSingleProductByName(params.name),
    enabled: !cachedProducts,
  });

  const product = cachedProducts
    ? cachedProducts.find((item) => item?.name === productName)
    : productData;

  useEffect(() => {
    const find = cart.products.find(
      (cartItem) => cartItem.name === productName
    );
    setIsInCart(!!find);
  }, [cart.products, productName]);

  if (isLoading) return <p>single product Loading...</p>;
  if (error) return <p>single product Something weng wrong!</p>;

  async function handleAddToCart(product: ProductType | undefined) {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    const cartItem = {
      productId: product?._id,
      name: product?.name,
      image: product?.image,
      price: product?.price,
    };

    const cartItem2 = {
      product: product?._id,
      name: product?.name,
      image: product?.image,
      price: product?.price,
    };

    mutate({ userId, cartItem });
    addToCart(cartItem2);
  }

  function handleRemoveFromCart(product: ProductType | undefined) {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      image: product?.image,
      price: product?.price,
    };

    andrewTate({
      userId,
      productId: cartItem.product,
      price: cartItem.price,
    });
    removeFromCart(cartItem);
    setIsInCart(false);
    return;
  }

  return (
    <>
      <section className="mt-14 sm:mt-20 py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-xl lg:max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <button
            className="flex gap-3 mb-7 items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => router.back()}>
            <ChevronLeftIcon width={20} />
            Back
          </button>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img className="w-full dark:hidden" src={product?.image} alt="" />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product?.name}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  Rp. {product?.price}
                </p>
                <div className="flex flex-col gap-2 mt-2 sm:mt-10">
                  <p>
                    Difficulty:{" "}
                    <span className="font-bold">{product?.difficulty}</span>
                  </p>
                  <p>
                    Category:{" "}
                    <span className="font-bold">{product?.category}</span>
                  </p>
                </div>
              </div>

              {product?.sellerId !== userId && (
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  {isInCart ? (
                    <button
                      onClick={() => handleRemoveFromCart(product)}
                      className="flex gap-3 items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-red-400 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      role="button">
                      <ShoppingBagIcon width={20} />
                      Remove from cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex gap-3 items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-blue-300 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      role="button">
                      <ShoppingBagIcon width={20} />
                      Add to cart
                    </button>
                  )}
                </div>
              )}

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

export default Page;
