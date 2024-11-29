import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import CartModal from "@/components/CartModal";
import { CartProvider } from "@/context/showCart/ShowCartProvider";

export const metadata: Metadata = {
  title: "Gitar-Kun",
  description: "Guitar Tabs E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body>
          <NavBar />
          <main>{children}</main>
          <CartModal />
        </body>
      </CartProvider>
    </html>
  );
}
