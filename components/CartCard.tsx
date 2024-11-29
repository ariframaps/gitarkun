import { ProductCardType } from "@/lib/types";
import Image from "next/image";
import React from "react";

const CartCard = ({ item }: { item: ProductCardType }) => {
  return (
    <li className="flex">
      <div>
        <Image src={item.image} alt={item.name} width={100} height={100} />
      </div>
      <div>
        <h5>{item.name}</h5>
        <span>{item.price}</span>
        <button>Remove</button>
      </div>
    </li>
  );
};

export default CartCard;
