import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";
import Link from "next/link";

import Repositories from "./repositoies";

const GuestLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();

  if (session) redirect("/feeds");

  return (
    <main className="tw-p-2 tw-flex-1 tw-flex tw-flex-col">
      {children}

      <div
        className="tw-absolute tw-top-0 tw-left-0
                      tw-text-center tw-w-full tw-p-1
                      tw-bg-white tw-border-b
                      "
      >
        <p className="tw-text-sm">배울게 산더미다</p>
        <p className="tw-text-xs tw-whitespace-normal">
          minimum-social은
          <Link
            className="tw-italic hover:tw-underline"
            href={"https://github.com/young1ll"}
          >
            (@young1ll)
          </Link>
          의 학습을 위한 개인 프로젝트입니다. 많은 응원과 격려 바랍니다.
        </p>
      </div>

      <Repositories />
    </main>
  );
};

export default GuestLayout;
