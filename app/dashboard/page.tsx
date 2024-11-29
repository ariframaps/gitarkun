import ProductCard from "@/components/ProductCard";
import { ProductCardType } from "@/lib/types";
import Link from "next/link";
import React from "react";

const page = () => {
  const products: ProductCardType[] = [
    {
      id: "2",
      name: "tes title1",
      image: "/fd/fdas.png",
      price: 99000,
      sellerId: "joko",
    },
    {
      id: "1",
      name: "tes title1",
      image: "/fd/fdas.png",
      price: 99000,
      sellerId: "joko",
    },
    {
      id: "3",
      name: "tes title1",
      image: "/fd/fdas.png",
      price: 99000,
      sellerId: "joko",
    },
  ];

  return (
    <div>
      <div>
        <span>Your Tabs</span>
        <button>
          <Link href={"/dashboard/add"}>+ Sell New Tab!</Link>
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-5">
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </ul>
    </div>
  );
};

export default page;
