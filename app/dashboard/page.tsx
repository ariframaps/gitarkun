"use client";

import ProductCard from "@/components/ProductCard";
import { getMyProduct } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const page = () => {
  const { userId } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["my-product"],
    queryFn: () => getMyProduct(userId),
  });

  if (error) return <p>something went wrong</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex w-full justify-between">
        <span>Your Tabs</span>
        <button>
          <Link href={"/dashboard/add"}>+ Sell New Tab!</Link>
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-5">
        {data &&
          data?.data?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </ul>
    </div>
  );
};

export default page;
