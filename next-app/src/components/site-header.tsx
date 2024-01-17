import config from "@/config";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import ProductSwitcher from "./product-switcher";
import Search from "./site-search";
import SiteNav from "./site-nav";
import SiteUser from "./site-user";
import { ModeToggle } from "@/theme/theme-toggle";

const SiteHeader = async () => {
  const session = await getServerSession(authOptions);
  const { id, username, email, darkmode } = session?.user;

  return (
    <header className="tw-sticky tw-z-50 tw-w-full tw-border-b tw-border-border/40 tw-bg-background/95 tw-backdrop-blur">
      <div className="tw-container tw-flex tw-h-14 tw-max-w-screen-2xl tw-items-center">
        {/* brand-area */}
        <div className="tw-mr-4">
          <Link href={"/"} className="tw-flex tw-items-center tw-space-x-2">
            {/* logo */}
            logo
            <span className="tw-hidden tw-font-bold lg:tw-inline-block">{config.site.name}</span>
          </Link>
        </div>

        {/* menu-area */}
        <div className="tw-flex tw-flex-1 tw-items-center tw-px-4">
          <ProductSwitcher />

          <SiteNav className="tw-px-4" />

          <div className="tw-ml-auto tw-flex tw-items-center tw-space-x-4">
            <Search />
            {session?.user ? (
              <SiteUser id={id} username={username} email={email} darkmode={darkmode} />
            ) : (
              <ModeToggle />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
