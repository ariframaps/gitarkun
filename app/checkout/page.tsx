"use client";

import CartCard from "@/components/CartCard";
import PaymentForm from "@/components/PaymentForm";
import { useCart } from "@/provider/context/CartContext";
import { Alert } from "flowbite-react";
import { AlertTriangleIcon } from "lucide-react";

const Page = () => {
  const { cart, totalPrice } = useCart();

  return (
    <section className="mt-20 md:mt-24 max-w-7xl mx-auto p-3 sm:p-8">
      <div className="md:flex gap-2 md:gap-6 lg:gap-12">
        <ul className="flex-1 flex flex-col gap-5">
          {cart.products &&
            cart.products.map((item) => (
              <CartCard key={item.name} item={item} />
            ))}
        </ul>
        <div className="flex-1 border rounded-sm p-2 sm:p-5 text-lg mt-5 md:mt-0">
          <div className="flex justify-between p-5 border-b-2 border-gray-300">
            <span>Total:</span>
            <span className="font-bold text-2xl text-yellow-600">
              Rp {totalPrice}
            </span>
          </div>
          <div className="p-5">
            <p>
              Your payment receipt and product will be delivery to your
              registered email{" "}
            </p>
          </div>
          <Alert className="bg-red-300 mx-3">
            <div className="w-64 sm:w-4/5">
              <span className="font-medium">Peringatan!</span> Jangan membayar
              dengan payment asli, karena ini adalah development mode. silahkan
              menggunakan payment simulator dari midtrans di instruksi dibawah
              ini (contoh menggunakan QRIS).
              <ul className="ms-5">
                <li className="list-disc">
                  Isi form dibawah dan klik checkout
                </li>
                <li className="list-disc">
                  Pilih metode pembayaran (Gopay/Gopay later)
                </li>
                <li className="list-disc">
                  Copy image address dari barcode QRIS
                </li>
                <li className="list-disc">
                  masukkan link image di sini (klik):{" "}
                  <a
                    className="text-blue-700"
                    target="_blank"
                    href="https://simulator.sandbox.midtrans.com/v2/qris/index">
                    Payment Simulator
                  </a>
                </li>
              </ul>
            </div>
          </Alert>
          <PaymentForm />
        </div>
      </div>
    </section>
  );
};

export default Page;
