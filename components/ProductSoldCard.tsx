import { ProductType } from "@/types/types";
import React from "react";

const ProductSoldCard = ({
  product,
}: {
  product: { product: ProductType; salesCount: number; revenue: number };
}) => {
  return (
    <li className="bg-neutral-100 border p-4 rounded flex flex-col md:flex-row gap-5 md:gap-10 justify-between md:items-center border-neutral-400">
      <div className="md:block hidden border-2 shadow-md">
        <img
          className="w-36 h-24 bg-cover"
          src={product.product.image}
          alt={product.product.name}
        />
      </div>
      <div className="justify-self-start w-max">
        <h3 className="font-semibold text-xl ">{product.product.name}</h3>
      </div>
      <div className="flex gap-20">
        <div>
          <p>Product sales: {product.salesCount}</p>
          <p className="text-xl text-green-700 font-bold">
            Rp. {product.product.price}
          </p>
        </div>
        <div>
          <p>Product revenue</p>
          <p className="text-xl text-green-700 font-bold">
            Rp. {product.revenue}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ProductSoldCard;
