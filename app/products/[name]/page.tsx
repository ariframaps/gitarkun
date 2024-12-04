"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCart,
  fetchSingleProductByName,
  removeProductFromCart,
} from "@/utils/api";
import { useAuth } from "@clerk/nextjs";
import { useCart } from "@/provider/context/CartContext";
import { ChevronLeftIcon, ShoppingBagIcon } from "lucide-react";

const Page = () => {
  const { cart, removeFromCart, addToCart } = useCart();
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams() as { name: string };
  const productName = params.name.split("_").join(" ");
  const [isInCart, setIsInCart] = useState(false); // is product in cart list check
  const { userId, isLoaded } = useAuth();

  const { mutate } = useMutation({
    mutationFn: addCart,
    onSuccess: (response, variable) => {
      addToCart(variable.cartItem);
      setIsInCart(true);
    },
  });

  const { mutate: andrewTate } = useMutation({
    mutationFn: removeProductFromCart,
    onSuccess: () => {
      removeFromCart(cartItem);
    },
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

  const cartItem = {
    product: product?._id,
    name: product?.name,
    image: product?.image,
    price: product?.price,
  };

  useEffect(() => {
    const find = cart.products.find(
      (cartItem) => cartItem.name === productName
    );
    setIsInCart(!!find);
  }, [cart.products, productName]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something weng wrong!</p>;

  // async function handleAddToCart() {
  //   if (!isSignedIn) {
  //     router.push("/sign-in");
  //     return;
  //   }

  //   mutate({ userId, cartItem });
  //   addToCart(cartItem);
  // }

  // function handleRemoveFromCart() {
  //   andrewTate({
  //     userId,
  //     productId: cartItem.product,
  //     price: cartItem.price,
  //   });
  //   removeFromCart(cartItem);
  //   setIsInCart(false);
  //   return;
  // }

  return (
    <>
      <section className="mt-14 sm:mt-20 py-8 bg-white md:py-16 antialiased">
        <div className="max-w-xl lg:max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <button
            className="flex gap-3 mb-7 items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            onClick={() => router.back()}>
            <ChevronLeftIcon width={20} />
            Back
          </button>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full"
                src={product?.image}
                alt={product?.name}
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
                      onClick={() =>
                        andrewTate({
                          productId: cartItem.product,
                          userId: userId,
                          price: cartItem.price,
                        })
                      }
                      className="flex gap-3 items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-red-400 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      role="button">
                      <ShoppingBagIcon width={20} />
                      Remove from cart
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (!isLoaded) return router.push("/sign-in");
                        mutate({ userId, cartItem });
                      }}
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
