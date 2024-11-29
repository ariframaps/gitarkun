import ProductCard from "@/components/ProductCard";
import { ProductCardType } from "@/lib/types";
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
      <section className="max-w-5xl mx-auto">
        <h1>Explore</h1>
        <div>
          <form>
            <span>Search : </span>
            <input type="text" name="searchInput" id="searchInput" />
            <button type="submit">Search</button>
          </form>
          {/* ini isi dropdown */}
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
