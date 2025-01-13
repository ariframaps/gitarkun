"use client";

import ProductSoldCard from "@/components/ProductSoldCard";
import { fetchAnalytics } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const Analytics = () => {
  const { userId } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => fetchAnalytics(userId),
  });

  return (
    <div className="flex flex-col gap-10 max-w-screen-lg">
      <div>
        <span className="font-semibold text-lg">Analytics</span>
        <div className="mt-5 p-5 border border-gray-400 rounded-sm text-lg bg-yellow-400 ">
          <p>Total of product sold : {data?.totalSales}</p>
          <p>
            Total revenue :
            <span className="font-bold text-[#17813C]">
              {" "}
              Rp {data?.totalRevenue}
            </span>
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {error && <p>something went wrong when fetching analytics</p>}
        {isLoading && (
          <div className="col-span-4 w-full h-20 md:h-28 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {Array.isArray(data?.productStats) &&
          data.productStats.map((product) => (
            <ProductSoldCard product={product} key={product.product._id} />
          ))}
      </ul>
    </div>
  );
};

export default Analytics;
