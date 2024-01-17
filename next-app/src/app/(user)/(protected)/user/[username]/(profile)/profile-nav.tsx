"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type navItem = {
  name: string;
  href: string;
};
interface ProfileNavProps extends React.HTMLAttributes<HTMLElement> {
  items: navItem[];
}

const ProfileNav = ({ items, className, ...props }: ProfileNavProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn("tw-flex tw-space-x-2 md:tw-flex-col md:tw-space-x-0 md:tw-space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "tw-bg-muted hover:tw-bg-muted" : "hover:tw-bg-transparent hover:tw-underline",
            "!tw-justify-start",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default ProfileNav;
