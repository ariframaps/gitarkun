"use client";

import PurchasedProductCard from "@/components/PurchasedProductCard";
import { fetchPurchasedProducts } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Purchased = () => {
  const { userId } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["purchased-products"],
    queryFn: () => fetchPurchasedProducts(userId),
  });

  if (error) return <p>puchased product page error</p>;
  if (isLoading) return <p>purchased product page loading.... </p>;

  console.log(data);
  return (
    <section>
      <h2>Purchased History</h2>
      <ul>
        {data?.data?.map((product) => (
          <PurchasedProductCard key={product.image} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default Purchased;
