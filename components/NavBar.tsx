import { NavLinkType } from "@/lib/types";
import Link from "next/link";
import React from "react";

const navLinks: NavLinkType[] = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
];

const NavBar = () => {
  return (
    <div className="w-screen p-3 border-b-2">
      <div className="flex justify-between">
        <h1>Logo</h1>
        <div className="flex gap-5">
          {navLinks.map((navLink) => (
            <Link href={navLink.href} key={navLink.name}>
              {navLink.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-5">
          <button>
            <Link href={"/cart"}>Cart</Link>
          </button>
          <button>
            <Link href={"/dashboard"}>Start Selling</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
