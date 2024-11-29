import { ProductCardType } from "@/lib/types";
import Image from "next/image";
import React from "react";

const CartCard = ({
  item,
  useInCart,
}: {
  item: ProductCardType;
  useInCart: boolean;
}) => {
  return (
    <li className="flex justify-between">
      <div>
        <Image src={item.image} alt={item.name} width={100} height={100} />
      </div>
      <div className="flex flex-col self-start">
        <h5>{item.name}</h5>
        {useInCart && <span>{item.price}</span>}
        <button>Remove</button>
      </div>
      {!useInCart && <span>{item.price}</span>}
    </li>
  );
};

export default CartCard;
