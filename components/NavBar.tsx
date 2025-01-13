"use client";

import { useShowCart } from "@/provider/context/ShowCartContext";
import { SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCart } from "@/provider/context/CartContext";
import { BookIcon, MenuIcon, ShoppingBagIcon } from "lucide-react";
import CartModal from "./CartModal";

const NavBar = () => {
  const { cart } = useCart();
  const { showCart, setShowCart } = useShowCart();
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const activeNavClass = `block py-2 px-3 text-white bg-[#17813C] rounded md:bg-transparent md:text-[#17813C] md:p-0 md:dark:text-yellow-500`;
  const inActiveNavClass =
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  const { isSignedIn } = useAuth();

  function handleShowCart() {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    setShowCart(!showCart);
  }

  return (
    <nav className="bg-[#FFD727] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      {showCart && <CartModal />}

      <div className="max-w-screen-xl gap-y-4 flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
          <BookIcon className="dark:text-white hidden sm:inline" width={20} />
          <span className="self-center md:text-xl font-bold whitespace-nowrap dark:text-white text-white bg-black px-4 py-1 font-serif">
            Gitar-Kun
          </span>
        </Link>
        <div className="flex md:gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={handleShowCart}
            type="button"
            className=" text-black flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 md:p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <ShoppingBagIcon className="dark:text-white" width={20} /> :{" "}
            {cart.products.length || 0}
          </button>
          <Link
            href={"/dashboard/my-products"}
            type="button"
            className="border-s-2 sm:border-s-0 sm:bg-red-600 sm:border-b-4 sm:border-e-4 border-black hover:bg-white hover:text-black text-black sm:text-white flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Sell Yours!
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button
            onClick={() => setShowNav(!showNav)}
            type="button"
            className="inline-flex items-center p-1 md:w-10 md:h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open main menu</span>
            <MenuIcon />
          </button>
        </div>
        <div
          className={`${
            showNav ? "" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li onClick={() => setShowNav(false)}>
              <Link
                href="/"
                className={pathName === "/" ? activeNavClass : inActiveNavClass}
                aria-current="page">
                Home
              </Link>
            </li>
            <li onClick={() => setShowNav(false)}>
              <Link
                href="/products"
                className={
                  pathName.includes("/products")
                    ? activeNavClass
                    : inActiveNavClass
                }>
                Explore Tabs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
