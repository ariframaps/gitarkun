"use client";

import CartCard from "@/components/CartCard";
import { addOrder, fetchCart } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const { userId } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(userId),
  });

  async function handleAddOrder() {
    const response = await addOrder(userId);
    console.log(response);
  }

  if (error) return <p>something went wront</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto">
      <h1>Checkout</h1>
      <div className="flex gap-14">
        <ul className="flex-1">
          {data?.data &&
            data.data.products.map((item) => (
              <CartCard key={item.name} item={item} useInCart={false} />
            ))}
        </ul>
        <div className="flex-1">
          <div className="flex justify-between">
            <span>Total:</span>
            <span>Rp {data?.data?.total}</span>
          </div>
          <div>
            <p>
              Your payment receipt and product will be delivery to your
              registered email:
            </p>
            <span>arif@mail.com</span>
          </div>
          <div className="flex" onClick={handleAddOrder}>
            <button>Dana</button>
            <button>Gopay</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
