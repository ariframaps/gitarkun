"use client";

import { useShowCart } from "@/provider/context/ShowCartProvider";
import Link from "next/link";
import CartCard from "./CartCard";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "@/lib/api";

const CartModal = () => {
  const { showCart, setShowCart } = useShowCart();
  const { userId } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(userId),
  });

  console.log(data);

  function handleClose() {
    setShowCart(false);
  }

  if (error) <p>something went wront</p>;
  if (isLoading) <p>Loading...</p>;

  if (!showCart) return;
  return (
    <div className="fixed inset-0 bg-white/60 flex justify-center items-center">
      <div>
        <button onClick={handleClose}>Close</button>
        <div>
          <h3>Cart (total)</h3>
          <p>Your all cart items are here!</p>
          <ul>
            {data?.data &&
              data.data.products.map((item) => (
                <CartCard key={item.name} item={item} useInCart={true} />
              ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-between">
            <span>Total:</span>
            <span>{data?.data?.total || 0}</span>
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
