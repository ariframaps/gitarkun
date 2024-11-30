"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { InfinitePageType, ProductType } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InfiniteData } from "@tanstack/react-query";
import { fetchSingleProduct } from "@/lib/api";

const page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams() as { name: string };

  const productName = params.name.split("_").join(" ");
  console.log(productName);

  // get from cache if exists
  const cachedProducts = queryClient.getQueryData([
    "all-products",
  ]) as InfiniteData<InfinitePageType>;
  console.log(cachedProducts);

  // check if cache is exist
  let product: ProductType | undefined;
  if (cachedProducts) {
    // find item by product name
    product = cachedProducts.pages
      .flatMap((page) => page.data.data)
      .find((item) => item?.name === productName);
  } else {
    const { data, error, isLoading } = useQuery({
      queryKey: [`${productName}`],
      queryFn: () => fetchSingleProduct("name", params.name),
    });

    if (error) return <p>Something weng wrong!</p>;
    if (isLoading) return <p>Loading...</p>;
    product = data?.data;
  }

  return (
    <>
      <section className="max-w-6xl mx-auto p-10">
        <button className="block" onClick={() => router.back()}>
          Back
        </button>
        <div className="flex">
          <div className="bg-red-300 flex-1">
            <Image
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
            <button>Add to Cart</button>
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
