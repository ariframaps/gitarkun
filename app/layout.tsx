import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import CartModal from "@/components/CartModal";
import { CartProvider } from "@/context/showCart/ShowCartProvider";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <CartProvider>
          <body>
            <NavBar />
            <main>{children}</main>
            <CartModal />
          </body>
        </CartProvider>
      </html>
    </ClerkProvider>
  );
}
