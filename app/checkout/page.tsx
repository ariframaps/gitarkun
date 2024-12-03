"use client";

import CartCard from "@/components/CartCard";
import { addOrder, fetchCart } from "@/lib/api";
import { useCart } from "@/provider/context/CartContext";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type AddOrderPayload = {
  userId: string | null | undefined;
};

const page = () => {
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();
  const { cart, clearCart } = useCart();

  const { mutate } = useMutation({
    mutationFn: addOrder,
  });

  async function handleAddOrder() {
    mutate({ userId });
    clearCart();
    router.push("/dashboard/purchased");
  }

  return (
    <section className="mt-16 md:mt-24 max-w-7xl mx-auto p-8">
      <div className="md:flex gap-2 md:gap-6 lg:gap-12">
        <ul className="flex-1 flex flex-col gap-5">
          {cart.products &&
            cart.products.map((item) => (
              <CartCard key={item.name} item={item} />
            ))}
        </ul>
        <div className="flex-1 border rounded-sm p-5 text-lg mt-5 md:mt-0">
          <div className="flex justify-between p-5 border-b-2 border-gray-300">
            <span>Total:</span>
            <span className="font-bold text-xl">Rp {cart.total}</span>
          </div>
          <div className="p-5">
            <p>
              Your payment receipt and product will be delivery to your
              registered email{" "}
              {/* <span className="font-semibold">arif@mail.com</span> */}
            </p>
          </div>
          <div className="flex gap-2   p-5" onClick={handleAddOrder}>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Dana
            </button>
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Gopay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
