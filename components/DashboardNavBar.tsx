"use client";

import { NavLinkType } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dashboarNavLinks: NavLinkType[] = [
  { name: "Your Tabs", href: "/dashboard/my-products" },
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Purchased", href: "/dashboard/purchased" },
];

function DashboardNavBar() {
  const pathName = usePathname();

  return (
    <div className="flex gap-2 sm:gap-5 pb-5 border-b border-neutral-400">
      {dashboarNavLinks.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className={`border border-b-4 border-e-4 border-1 py-1 sm:py-2 border-black rounded-sm px-3 ${
            pathName.includes(link.href) ? "bg-[#17813C] text-white" : ""
          }`}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default DashboardNavBar;
