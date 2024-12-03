"use client";

import { useShowCart } from "@/provider/context/ShowCartContext";
import Link from "next/link";
import CartCard from "./CartCard";
import { useCart } from "@/provider/context/CartContext";
import { CrossIcon, XIcon } from "lucide-react";

const CartModal = () => {
  const { cart, totalPrice } = useCart();
  const { showCart, setShowCart } = useShowCart();
  console.log(cart);
  if (!showCart) return null;

  return (
    <>
      <div className="flex overflow-y-auto overflow-x-hidden bg-gray-600/80 fixed inset-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Cart
              </h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <XIcon />
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <ul className="flex flex-col justify-stretch">
              {cart &&
                cart.products.map((item) => (
                  <CartCard key={item.name} item={item} />
                ))}
            </ul>

            {/* <!-- Modal footer --> */}
            {cart.products.length > 0 && (
              <div className="flex gap-5 justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Link
                  onClick={() => setShowCart(false)}
                  href={"/checkout"}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Checkout
                </Link>
                <div>Total : Rp. {totalPrice}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
