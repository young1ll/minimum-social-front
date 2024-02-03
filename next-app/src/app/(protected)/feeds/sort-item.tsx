"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface SortTabItemProps {
  name: string;
}

const SortTabItem = (
  props: SortTabItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>,
) => {
  const { name, className, href, ...rest } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams.toString()}`;

  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "tw-w-1/2 tw-h-full tw-rounded-none",
        "tw-border-b-2",
        url === href ? "tw-border-orange-500" : "tw-border-transparent",
        className,
      )}
      href={href as string}
      {...rest}
    >
      {name}
    </Link>
  );
};

export default SortTabItem;
