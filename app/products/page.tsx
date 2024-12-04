"use client";

import ProductCard from "@/components/ProductCard";
import { fetchAllProducts } from "@/utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useEffect, useState } from "react";
import { ProductType } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSideBar from "@/components/FilterSideBar";
import { useFilter } from "@/provider/context/filterContext";
import { FileSearch2Icon } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const [searchVal, setSearchVal] = useState("");
  const queryClient = useQueryClient();
  const { productsList, initialProductsList } = useFilter();

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["all-products"],
    queryFn: fetchAllProducts,
  });

  useEffect(() => {
    function fetchFromCache() {
      if (searchTerm) {
        const cache = queryClient.getQueryData(["all-products"]) as
          | ProductType[]
          | undefined;

        if (cache) {
          const filtered: ProductType[] = cache.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          initialProductsList(filtered); // simpan data hasil filter ke initial cart
        }
      } else if (Array.isArray(data)) {
        initialProductsList(data); // simpan semua data jika tidak ada pencarian
      }
    }

    fetchFromCache();
  }, [searchTerm, data]);

  return (
    <div className="flex flex-col gap-5 md:gap-10 max-w-screen-xl py-8 mx-auto sm:px-4 px-3 mt-14 lg:mt-32">
      <div className="flex gap-5">
        <FilterSideBar />
        <div className="flex-1 flex flex-col gap-10 items-center">
          <form
            onSubmit={() => router.push(`/products?search=${searchVal}`)}
            className="w-full mx-auto">
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FileSearch2Icon />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by song name"
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="hidden sm:block flex-shrink-0 w-72 "></div>
        {error && <p>Something went wrong</p>}
        {isLoading && <p>Loading...</p>}
        {isSuccess && (
          <ul className="flex-grow-0 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 w-full justify-items-stretch">
            {productsList.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ProductPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default ProductPageWithSuspense;
