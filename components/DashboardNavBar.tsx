import { NavLinkType } from "@/lib/types";
import Link from "next/link";

const dashboarNavLinks: NavLinkType[] = [
  { name: "Your Tabs", href: "/dashboard/my-products" },
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Purchased", href: "/dashboard/purchased" },
];

function DashboardNavBar() {
  return (
    <div className="flex gap-5">
      {dashboarNavLinks.map((link) => (
        <Link href={link.href} key={link.name}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default DashboardNavBar;
