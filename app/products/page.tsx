"use client";

import ProductCard from "@/components/ProductCard";
import { fetchAllProducts } from "@/lib/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

const page = () => {
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["all-product"],
      queryFn: fetchAllProducts,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (error) return <p>Something went wrong</p>;
  if (isLoading) return <p>Loading...</p>;

  console.log(data);

  return (
    <>
      <section className="max-w-5xl mx-auto">
        <h1>Explore</h1>
        <div>
          <form>
            <span>Search : </span>
            <input type="text" name="searchInput" id="searchInput" />
            <button type="submit">Search</button>
          </form>
          {/* ini isi dropdown buat filter dan sort*/}
        </div>
        <div className="bg-yellow-200 flex flex-col gap-5">
          {data &&
            data.pages.map((page) => (
              <ul
                key={page.currentPage}
                className="bg-green-200 grid grid-cols-3 gap-5">
                {page.data.data?.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </ul>
            ))}

          <div ref={ref}>{isFetchingNextPage && "Loading More Tabs...."}</div>
        </div>
      </section>
    </>
  );
};

export default page;
