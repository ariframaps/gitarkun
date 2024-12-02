"use client";

import ProductSoldCard from "@/components/ProductSoldCard";
import { fetchAnalytics } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Analytics = () => {
  const { userId } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => fetchAnalytics(userId),
  });
  console.log(data);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="font-semibold text-lg">Analytics</span>
        <div>
          <p>Total of product sold: {data?.totalSales}</p>
          <p>Total revenue: Rp {data?.totalRevenue}</p>
        </div>
      </div>
      <ul>
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
