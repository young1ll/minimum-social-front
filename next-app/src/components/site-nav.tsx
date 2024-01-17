import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

const navitems = [
  {
    name: "Trending",
    href: "/trending",
  },
  {
    name: "New",
    href: "/new",
  },
  {
    name: "Top",
    href: "/top",
  },
];

interface SiteNavProps extends HTMLAttributes<HTMLElement> {}

const SiteNav = ({ className }: SiteNavProps) => {
  return (
    <nav className={cn("tw-flex tw-items-center tw-space-x-4 lg:tw-space-x-6", className)}>
      {navitems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="tw-text-sm tw-font-medium tw-transition-colors hover:tw-text-primary"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default SiteNav;
