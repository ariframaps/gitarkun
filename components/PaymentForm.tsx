"use client";

import { addOrder, getTransactionToken } from "@/utils/api";
import { useCart } from "@/provider/context/CartContext";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";

export default function PaymentForm() {
  const { cart, totalPrice, clearCart } = useCart();
  const { userId } = useAuth();
  const { user } = useUser();
  const [phone, setPhone] = useState("");
  const [showSnapToggle, setShowSnapToggle] = useState(false);

  useEffect(() => {
    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-z8YJlvSZE4wXvWki"; //change this according to your client-key

    const script = document.createElement("script");
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [showSnapToggle]);

  const { mutate } = useMutation({
    mutationFn: addOrder,
  });

  async function handleCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      user !== undefined &&
      user !== null &&
      user.fullName &&
      user.primaryEmailAddress &&
      user.primaryEmailAddress.emailAddress
    ) {
      const customer_details = {
        first_name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        phone: phone,
      };

      await getTransactionToken({
        gross_amount: totalPrice,
        customer_details,
        cart: cart.products,
      }).then((res) => {
        setShowSnapToggle(!showSnapToggle);
        window.snap.pay(res.transactionToken, {
          onSuccess: function () {
            mutate({ userId });
            clearCart();
          },
        });
      });
    }
  }

  return (
    <form
      onSubmit={(e) => handleCheckout(e)}
      className="flex max-w-md flex-col gap-4 p-5">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone_number" value="Your phone number" />
        </div>
        <TextInput
          id="phone_number"
          type="tel"
          placeholder="08123467643"
          required
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <Button type="submit" className="bg-black">
        Checkout
      </Button>
    </form>
  );
}
