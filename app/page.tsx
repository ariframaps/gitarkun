"use client";

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestProducts } from "@/lib/api";

const page = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["latest-products"],
    queryFn: fetchLatestProducts,
  });

  if (error) return <p>home Something went wrong</p>;
  if (isLoading) return <p>home Loading...</p>;

  return (
    <>
      <section className="flex">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div>
            <h1>Title</h1>
            <p>Caption</p>
            <div className="flex gap-5">
              <button>
                <Link href={"/products"}>Explore</Link>
              </button>
              <button>
                <Link href={"/dashboard"}>Sell</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-red-400 flex-1 flex justify-center items-center">
          <Image
            src={"/fd/fdas.png"}
            alt="Guitar Tabs"
            width={100}
            height={400}
          />
        </div>
      </section>
      <section className="max-w-5xl mx-auto">
        <div className="flex w-full justify-between">
          <span>Featured</span>
          <button>
            <Link href={"/products"}>View All</Link>
          </button>
        </div>
        <ul className="grid grid-cols-3 gap-5">
          {data &&
            data.data.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </ul>
      </section>
    </>
  );
};

export default page;
