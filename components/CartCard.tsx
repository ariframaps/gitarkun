import { CartProductInfo, ProductType } from "@/lib/types";
import { useCart } from "@/provider/context/CartContext";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import React from "react";

const CartCard = ({
  item,
  useInCart,
}: {
  item: CartProductInfo;
  useInCart: boolean;
}) => {
  const { removeFromCart } = useCart();
  return (
    <li className="flex justify-between">
      <div>
        <CldImage
          src={item.image || ""}
          alt={item.name || ""}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col self-start">
        <h5>{item.name}</h5>
        {useInCart && <span>{item.price}</span>}
        <button onClick={() => removeFromCart(item)}>Remove</button>
      </div>
      {!useInCart && <span>{item.price}</span>}
    </li>
  );
};

export default CartCard;
