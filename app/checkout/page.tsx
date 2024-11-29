import CartCard from "@/components/CartCard";
import { ProductCardType } from "@/lib/types";

const page = () => {
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

  return (
    <section className="max-w-7xl mx-auto">
      <h1>Checkout</h1>
      <div className="flex gap-14">
        <ul className="flex-1">
          {cartItems &&
            cartItems.map((item) => (
              <CartCard key={item.id} item={item} useInCart={false} />
            ))}
        </ul>
        <div className="flex-1">
          <div className="flex justify-between">
            <span>Total:</span>
            <span>Rp 90.000</span>
          </div>
          <div>
            <p>
              Your payment receipt and product will be delivery to your
              registered email:
            </p>
            <span>arif@mail.com</span>
          </div>
          <div className="flex">
            <button>Dana</button>
            <button>Gopay</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
