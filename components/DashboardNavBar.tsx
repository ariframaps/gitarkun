"use client";

import { NavLinkType } from "@/lib/types";
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
    <div className="flex gap-2">
      {dashboarNavLinks.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className={`border border-1 py-1 sm:py-2 border-black rounded-sm px-3 ${
            pathName.includes(link.href) ? "bg-black text-white" : ""
          }`}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default DashboardNavBar;
