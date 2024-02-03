import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import UserSidebar from "./user-sidebar";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div className="tw-flex tw-flex-1 tw-flex-row tw-basis-auto tw-items-stretch tw-w-full">
      <UserSidebar />
      <main className="tw-flex-1 tw-flex tw-flex-col tw-shrink tw-grow tw-basis-auto tw-items-start">
        <div className="tw-w-[600px] lg:tw-w-[990px] tw-h-full tw-flex tw-flex-col tw-flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
