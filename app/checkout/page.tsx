"use client";

import CartCard from "@/components/CartCard";
import PaymentForm from "@/components/PaymentForm";
import { useCart } from "@/provider/context/CartContext";

export type AddOrderPayload = {
  userId: string | null | undefined;
};

const Page = () => {
  const { cart, totalPrice } = useCart();

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
            <span className="font-bold text-xl">Rp {totalPrice}</span>
          </div>
          <div className="p-5">
            <p>
              Your payment receipt and product will be delivery to your
              registered email{" "}
            </p>
          </div>
          <PaymentForm />
        </div>
      </div>
    </section>
  );
};

export default Page;
