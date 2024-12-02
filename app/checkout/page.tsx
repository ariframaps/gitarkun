"use client";

import CartCard from "@/components/CartCard";
import { addOrder, fetchCart } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type AddOrderPayload = {
  userId: string | null | undefined;
};

const page = () => {
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();

  const { mutate } = useMutation({
    mutationFn: addOrder,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(userId),
    refetchOnMount: true,
    enabled: isSignedIn,
  });
  console.log(data, "cart di checkout");

  async function handleAddOrder() {
    console.log(userId, "ini user id wakt uadd order di checkout");
    mutate({ userId });
    router.refresh();
  }

  if (error) return <p>something went wront</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="mt-24 max-w-7xl mx-auto bg-red-">
      <h1>Checkout</h1>
      <div className="flex gap-14">
        <ul className="flex-1">
          {data?.products &&
            data.products.map((item) => (
              <CartCard key={item.name} item={item} />
            ))}
        </ul>
        <div className="flex-1 border rounded-sm p-5 text-lg">
          <div className="flex justify-between p-5 border-b-2 border-gray-300">
            <span>Total:</span>
            <span className="font-bold text-xl">Rp {data?.total}</span>
          </div>
          <div className="p-5">
            <p>
              Your payment receipt and product will be delivery to your
              registered email:{" "}
              <span className="font-semibold">arif@mail.com</span>
            </p>
          </div>
          <div className="flex gap-5 p-5" onClick={handleAddOrder}>
            <button>Dana</button>
            <button>Gopay</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
