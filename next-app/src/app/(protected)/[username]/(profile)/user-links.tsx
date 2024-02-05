"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserLinksProps {
  username: string;
}

const UserLinks = (props: UserLinksProps) => {
  const { username } = props;
  const pathname = usePathname();

  const userLinks = [
    {
      name: "Topics",
      href: `/${username}`,
    },
    {
      name: "Voted",
      href: `/${username}/voted`,
    },
    {
      name: "Media",
      href: `/${username}/media`,
    },
    {
      name: "Likes",
      href: `/${username}/likes`,
    },
  ];

  return (
    <div className={cn("tw-border-b", "tw-flex-1 tw-flex tw-justify-between")}>
      {userLinks.map((link) => (
        <Link
          key={link.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "tw-rounded-none",
            "tw-w-full tw-h-14 !tw-text-base",
            "tw-font-semibold",
            "tw-border-b-4 tw-border-orange-500",
            pathname !== link.href &&
              "tw-text-zinc-500 tw-border-b-transparent",
          )}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default UserLinks;
