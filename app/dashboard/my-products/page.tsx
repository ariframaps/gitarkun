"use client";

import MyProductCard from "@/components/MyProductCard";
import ProductCard from "@/components/ProductCard";
import { getMyProduct } from "@/lib/api";
import { ProductType } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const { userId } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["my-product"],
    queryFn: () => getMyProduct(userId),
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full justify-between">
        <span className="font-semibold text-lg">Your Tabs</span>
        <button className="text-white bg-blue-700 flex items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <Link href={"/dashboard/my-products/add"}>+ Sell New Tab!</Link>
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-5">
        {error && <p>something went wrong</p>}
        {isLoading && <p>Loading my products...</p>}
        {Array.isArray(data) &&
          data.map((product) => (
            <MyProductCard product={product} key={product._id} />
          ))}
      </ul>
    </div>
  );
};

export default page;
