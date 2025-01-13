"use client";

import PurchasedProductCard from "@/components/PurchasedProductCard";
import { fetchPurchasedProducts } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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
        {isLoading && (
          <div className="col-span-3 w-full h-20 md:h-28 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {Array.isArray(data) &&
          data?.map((product, index) => (
            <PurchasedProductCard key={index} product={product} />
          ))}
      </ul>
    </section>
  );
};

export default Purchased;
