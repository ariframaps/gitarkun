import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ShowCartProvider } from "@/provider/context/ShowCartContext";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { CartProvider } from "@/provider/context/CartContext";
import { FilterProvider } from "@/provider/context/filterContext";

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
      <head></head>
      <body>
        <ClerkProvider>
          <ReactQueryProvider>
            <FilterProvider>
              <CartProvider>
                <ShowCartProvider>
                  <NavBar />
                  <main>{children}</main>
                </ShowCartProvider>
              </CartProvider>
            </FilterProvider>
          </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
