"use client";

import ProductSoldCard from "@/components/ProductSoldCard";
import { fetchAnalytics } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Analytics = () => {
  const { userId } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => fetchAnalytics(userId),
  });

  console.log(error);

  return (
    <div className="flex flex-col gap-10  max-w-screen-2xl">
      <div>
        <span className="font-semibold text-lg">Analytics</span>
        <div className="mt-5 p-5 border border-gray-400 rounded-sm text-lg">
          <p>Total of product sold : {data?.totalSales}</p>
          <p>Total revenue : Rp {data?.totalRevenue}</p>
        </div>
      </div>
      <ul className="flex flex-col gap-5">
        {error && <p>something went wrong when fetching analytics</p>}
        {isLoading && <p>Loading analytics...</p>}
        {Array.isArray(data?.productStats) &&
          data.productStats.map((product) => (
            <ProductSoldCard product={product} key={product.product._id} />
          ))}
      </ul>
    </div>
  );
};

export default Analytics;
