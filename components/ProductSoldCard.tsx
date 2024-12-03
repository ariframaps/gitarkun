import { ProductType } from "@/lib/types";
import React from "react";

const ProductSoldCard = ({
  product,
}: {
  product: { product: ProductType; salesCount: number; revenue: number };
}) => {
  return (
    <li className="bg-slate-100 border p-6 rounded max-w-4xl flex flex-col md:flex-row gap-5 md:gap-10 justify-between justify-items-start md:items-center   ">
      <div className="md:block hidden ">
        <img
          className="w-32 h-32 bg-cover"
          src={product.product.image}
          alt={product.product.name}
        />
      </div>
      <div>
        <h3 className="font-semibold text-xl">{product.product.name}</h3>
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
