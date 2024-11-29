"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductCardType, ProductType } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const product: ProductType = {
    id: "1",
    name: "coba judul 1",
    image: "/fdaf/fdfas/fd.png",
    description: "arif rama pdsafdasjfk;dsajfds;a fsda",
    price: 990,
    difficulty: "Beginner",
    category: "classic",
    link: "https://unsplash.com/photos/a-person-holding-a-camera-with-a-memory-card-attached-to-it-qTl9LjV6Gz0",
    sellerId: "2",
    isDeleted: false,
  };

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

  function handleBackBtn() {
    router.back();
  }
  return (
    <>
      <section className="max-w-6xl mx-auto p-10">
        <button className="block" onClick={handleBackBtn}>
          Back
        </button>
        <div className="flex">
          <div className="bg-red-300 flex-1">
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
            />
          </div>
          <div className="flex-1">
            <div>
              <h1>{product.name}</h1>
              <span>{product.category}</span>
            </div>
            <h2>{product.price}</h2>
            <p>{product.description}</p>
            <button>Add to Cart</button>
            <div>
              <span>Seller : {product.sellerId}</span>
            </div>
          </div>
        </div>

        <div>
          <h1>Buy More!</h1>
          <ul className="grid grid-cols-3 gap-5">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
