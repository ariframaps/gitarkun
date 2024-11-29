import ProductCard from "@/components/ProductCard";
import { ProductCardType } from "@/lib/types";
import Image from "next/image";
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
    <>
      <section className="flex">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div>
            <h1>Title</h1>
            <p>Caption</p>
            <div className="flex gap-5">
              <button>
                <Link href={"/products"}>Explore</Link>
              </button>
              <button>
                <Link href={"/dashboard"}>Sell</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-red-400 flex-1 flex justify-center items-center">
          <Image
            src={"/fd/fdas.png"}
            alt="Guitar Tabs"
            width={100}
            height={400}
          />
        </div>
      </section>
      <section className="max-w-5xl mx-auto">
        <div className="flex w-full justify-between">
          <span>Featured</span>
          <button>
            <Link href={"/products"}>View All</Link>
          </button>
        </div>
        <ul className="grid grid-cols-3 gap-5">
          {products &&
            products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </ul>
      </section>
    </>
  );
};

export default page;
