import SiteHeader from "@/components/site-header";
import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();
  if (!session) redirect("/signin");

  return (
    <>
      <SiteHeader />
      <main className="tw-p-2 tw-flex-1 tw-flex">{children}</main>
    </>
  );
};

export default ProtectedLayout;
