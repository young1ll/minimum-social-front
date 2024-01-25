import config from "@/config";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import Link from "next/link";
import React from "react";
import Search from "./site-search";
import SiteNav from "./site-nav";
import SiteUser from "./site-user";
import ProductSwitcher from "./product-switcher";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/theme/theme-toggle";
import { buttonVariants } from "./ui/button";
import { BellIcon } from "@radix-ui/react-icons";

const SiteHeader = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="tw-sticky tw-top-0 tw-z-50 tw-w-full tw-border-b tw-border-border/40 tw-bg-background/95 tw-backdrop-blur">
      <div className="tw-container tw-flex tw-h-14 tw-max-w-screen-2xl tw-items-center">
        {/* brand-area */}
        <div className="tw-mr-4">
          <Link href={"/"} className="tw-flex tw-gap-1 tw-items-center">
            {/* logo */}
            logo
            <span className="tw-hidden tw-font-bold lg:tw-inline-block">
              {config.site.name}
            </span>
          </Link>
        </div>

        {/* menu-area */}
        <div className="tw-flex tw-flex-1 tw-items-center">
          <Search />
          {/* <ProductSwitcher /> */}

          <div className="tw-ml-auto tw-flex tw-items-center tw-space-x-4">
            <SiteNav className="tw-hidden sm:tw-flex tw-px-4" />

            <Link
              href={`/user/${session?.user.username}/notifications`}
              className={cn(
                buttonVariants({ size: "icon", variant: "outline" }),
              )}
            >
              <BellIcon />
            </Link>

            {session?.user ? <SiteUser /> : <ModeToggle />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
