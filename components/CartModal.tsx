"use client";

import { useShowCart } from "@/provider/context/ShowCartContext";
import Link from "next/link";
import CartCard from "./CartCard";
import { useCart } from "@/provider/context/CartContext";

const CartModal = () => {
  const { cartList, totalPrice } = useCart();
  const { showCart, setShowCart } = useShowCart();

  function handleClose() {
    setShowCart(false);
  }
  if (!showCart) return null;

  return (
    <div className="fixed inset-0 bg-white/60 flex justify-center items-center">
      <div>
        <button onClick={handleClose}>Close</button>
        <div>
          <h3>Cart (total)</h3>
          <p>Your all cart items are here!</p>
          <ul>
            {cartList &&
              cartList.map((item) => (
                <CartCard key={item.name} item={item} useInCart={true} />
              ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-between">
            <span>Total:</span>
            <span>{totalPrice || 0}</span>
          </div>
          <button onClick={handleClose}>
            <Link href={"/checkout"}>Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
