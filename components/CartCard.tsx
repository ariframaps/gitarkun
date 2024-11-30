import { ProductType } from "@/lib/types";
import Image from "next/image";
import React from "react";

const CartCard = ({
  item,
  useInCart,
}: {
  item: { product: ProductType; price: number };
  useInCart: boolean;
}) => {
  console.log(item);
  return (
    <li className="flex justify-between">
      <div>
        <Image
          src={item.product.image}
          alt={item.product.name}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col self-start">
        <h5>{item.product.name}</h5>
        {useInCart && <span>{item.price}</span>}
        <button>Remove</button>
      </div>
      {!useInCart && <span>{item.price}</span>}
    </li>
  );
};

export default CartCard;
