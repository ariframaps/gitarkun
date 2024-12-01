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

  const productName = params.name.split("_").join(" ");
  console.log(productName);

  // get from cache if exists
  const cachedProducts = queryClient.getQueryData([
    "all-products",
  ]) as ProductType[];
  console.log(cachedProducts);

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

    if (error) return <p>single product Something weng wrong!</p>;
    if (isLoading) return <p>single product Loading...</p>;
    product = data?.data;
  }

  async function handleAddToCart() {
    // await addCart(userId, {
    //   productId: product?._id,
    //   name: product?.name,
    //   image: product?.image,
    //   price: product?.price,
    // }).then((response) => console.log(response));
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
      <section className="max-w-6xl mx-auto p-10">
        <button className="block" onClick={() => router.back()}>
          Back
        </button>
        <div className="flex">
          <div className="bg-red-300 flex-1">
            <CldImage
              src={product?.image || "/fdsafasd/fdsafdsa/png"} // need to fix the undefined imaage
              alt={product?.name || "GitarKun"}
              width={100}
              height={100}
            />
          </div>
          <div className="flex-1">
            <div>
              <h1>{product?.name}</h1>
              <span>{product?.category}</span>
            </div>
            <h2>{product?.price}</h2>
            <p>{product?.description}</p>
            <p>{product?.difficulty}</p>
            <button onClick={handleAddToCart}>
              {isInCart ? "Remove" : "Add to cart"}
            </button>
            <div>
              <span>Seller : {product?.sellerId}</span>
            </div>
          </div>
        </div>

        <div>
          <h1>Buy More!</h1>
          {/* <ul className="grid grid-cols-3 gap-5">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </ul> */}
          {/* fix product suggestion */}
        </div>
      </section>
    </>
  );
};

export default page;
