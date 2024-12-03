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

  return (
    <section className="flex flex-col gap-10">
      <h2 className="font-semibold text-lg">Purchased History</h2>
      <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 place-content-stretch place-items-stretch">
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
