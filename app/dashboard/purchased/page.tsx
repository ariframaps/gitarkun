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

  console.log(data);
  return (
    <section className="flex flex-col gap-10">
      <h2 className="font-semibold text-lg">Purchased History</h2>
      <ul>
        {error && <p>puchased product page error</p>}
        {isLoading && <p>purchased product page loading.... </p>}
        {Array.isArray(data) &&
          data?.map((product) => (
            <PurchasedProductCard key={product.image} product={product} />
          ))}
      </ul>
    </section>
  );
};

export default Purchased;
