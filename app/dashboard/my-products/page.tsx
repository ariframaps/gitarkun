"use client";

import MyProductCard from "@/components/MyProductCard";
import { getMyProduct } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { userId } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["my-product"],
    queryFn: () => getMyProduct(userId),
    enabled: !!userId,
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full items-center justify-between">
        <span className="font-semibold text-lg">Your Tabs</span>
        <button className=" flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-yellow-400 border-b-4 border-e-4 border-black hover:bg-yellow-500 text-black">
          <Link
            href={"/dashboard/my-products/add"}
            className="flex gap-2  px-2 py-2 md:py-2 ">
            <Plus size={20} /> Sell New Tab!
          </Link>
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {error && <p>something went wrong</p>}
        {isLoading && (
          <div className="col-span-4 w-full h-20 md:h-28 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {Array.isArray(data?.products) &&
          data.products.map(
            (product) =>
              !product.isDeleted && (
                <MyProductCard product={product} key={product._id} />
              )
          )}
      </ul>
    </div>
  );
};

export default Page;
