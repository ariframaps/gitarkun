"use client";

import ProductCard from "@/components/ProductCard";
import { fetchAllProducts } from "@/lib/api";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import { InfinitePageType, ProductType } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSideBar from "@/components/FilterSideBar";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  console.log(searchTerm);
  const [searchVal, setSearchVal] = useState("");

  const queryClient = useQueryClient();

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["all-products"],
    queryFn: fetchAllProducts,
  });

  let fetchedData = data?.data;
  if (searchTerm) {
    const cache = queryClient.getQueryData(["all-products"]) as
      | {
          message: string;
          data?: ProductType[];
        }
      | undefined;
    fetchedData = cache?.data?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(fetchedData);
  }

  return (
    <div className="flex">
      <FilterSideBar />
      <div className="flex-1">
        <form onSubmit={() => router.push(`/products?search=${searchVal}`)}>
          <span>Search : </span>
          <input
            type="text"
            name="search"
            id="search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {error && <p>Explore Something went wrong</p>}
        {isLoading && <p>explore Loading...</p>}
        {isSuccess && (
          <ul className="grid grid-cols-3 gap-5">
            {fetchedData?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </ul>
        )}
      </div>
      {/* <div className="bg-yellow-200 flex flex-col gap-5"></div> */}
    </div>
  );
};

export default page;

// {data &&
//   data.pages.map((page) => (
//     <ul
//       key={page.currentPage}
//       className="bg-green-200 grid grid-cols-3 gap-5">
//       {/* {page.data.data?.map((product) => (
//           <ProductCard product={product} key={product._id} />
//         ))} */}
//       {page.data.data
//         ?.filter((product) =>
//           searchTerm
//             ? product.name
//                 .toLowerCase()
//                 .includes(searchTerm.toLowerCase())
//             : true
//         )
//         .map((product) => (
//           <ProductCard product={product} key={product._id} />
//         )) || <p>No products found</p>}
//     </ul>
//   ))}

// <div ref={ref}>{isFetchingNextPage && "Loading More Tabs...."}</div>
