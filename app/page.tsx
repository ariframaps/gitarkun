"use client";

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestProducts } from "@/lib/api";
import heroImage from "@/assets/hero_mage.png";

const Page = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["latest-products"],
    queryFn: fetchLatestProducts,
  });

  return (
    <>
      <section className="dark:bg-gray-900 mt-16 py-16 bg-slate-100">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Best Guitar Tabs Store!
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              You don't need to bother making it yourself from scratch. You can
              see it here and improvise yourself.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Explore Tabs!
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Sell Your Own Tabs
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image src={heroImage} alt="GitarKun" width={400} height={400} />
          </div>
        </div>
      </section>

      <section className="max-w-screen-xl py-8 mx-auto sm:px-10 px-3">
        <div className="flex w-full justify-between mb-5 sm:mb-10">
          <span className="font-semibold text-xl">Featured</span>
          <button className="text-white bg-blue-700 flex items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <Link href={"/products"}>View All</Link>
          </button>
        </div>
        {error && <p>Something went wrong</p>}
        {isLoading && <p>Loading...</p>}
        {!error && !isLoading && data && (
          <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 place-items-stretch">
            {Array.isArray(data)
              ? data.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))
              : "No products found"}
          </ul>
        )}
      </section>
    </>
  );
};

export default Page;
