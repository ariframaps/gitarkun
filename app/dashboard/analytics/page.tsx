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

  if (error) return <p>analytics something went worn g</p>;
  if (isLoading) return <p>analytics Loading...</p>;
  if (!data?.data) return <p>no product sold</p>;

  console.log(data);

  return (
    <div>
      <div>
        <span>Analytics</span>
        <div>
          <p>Total of product sold: {data.data.totalSales}</p>
          <p>Total revenue: Rp {data.data.totalRevenue}</p>
        </div>
      </div>
      <ul>
        {data.data &&
          data.data.productStats.map((product) => (
            <ProductSoldCard product={product} key={product.product._id} />
          ))}
      </ul>
    </div>
  );
};

export default Analytics;
