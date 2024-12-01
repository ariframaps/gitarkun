"use client";

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

  if (error) return <p>something went worn g</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data?.data) return <p>no product sold</p>;

  console.log(data);

  return (
    <div>
      <div>
        <span>Analytics</span>
        <div>
          <p>Total of product sold: 13</p>
          <p>Total revenue: Rp 480.000</p>
        </div>
      </div>
      <div>item</div>
    </div>
  );
};

export default Analytics;
