import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import CartModal from "@/components/CartModal";
import { CartProvider, useShowCart } from "@/provider/context/ShowCartProvider";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

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
        <ReactQueryProvider>
          <CartProvider>
            <body>
              <NavBar />
              <main>{children}</main>
              <CartModal />
            </body>
          </CartProvider>
        </ReactQueryProvider>
      </html>
    </ClerkProvider>
  );
}
