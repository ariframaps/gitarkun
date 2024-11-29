"use client";

import { useShowCart } from "@/context/showCart/ShowCartProvider";
import Link from "next/link";
import CartCard from "./CartCard";
import { ProductCardType } from "@/lib/types";

const CartModal = () => {
  const { showCart, setShowCart } = useShowCart();

  const cartItems: ProductCardType[] = [
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

  function handleClose() {
    setShowCart(false);
  }

  if (!showCart) return;
  return (
    <div className="fixed inset-0 bg-white/60 flex justify-center items-center">
      <div>
        <button onClick={handleClose}>Close</button>
        <div>
          <h3>Cart (total)</h3>
          <p>Your all cart items are here!</p>
          <ul>
            {cartItems &&
              cartItems.map((item) => <CartCard key={item.id} item={item} />)}
          </ul>
        </div>
        <div>
          <div className="flex justify-between">
            <span>Total:</span>
            <span>Rp 50.000</span>
          </div>
          <button>
            <Link href={"/checkout"}>Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
