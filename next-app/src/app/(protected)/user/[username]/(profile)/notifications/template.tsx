"use client";

import { Box } from "@/components/ui/box";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NotificationsTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const lastParam = pathname?.split("/").pop();

  const session = useSession();
  const user = session.data?.user;

  const notificationPaths = [
    {
      key: "notifications",
      name: "All",
    },
    {
      key: "mentions",
      name: "Mentions",
    },
  ];

  return (
    <Box>
      <Box direction={"row"}>
        {notificationPaths.map((path) => (
          <Link
            href={`/user/${user?.username}/notifications/${path.key === "notifications" ? "" : path.key}`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "tw-relative tw-px-6",
            )}
          >
            <span>{path.name}</span>
            <div
              className={`tw-absolute tw-bottom-0 tw-w-full tw-h-1 tw-rounded-lg ${lastParam === path.key ? "tw-bg-primary" : ""}`}
            />
          </Link>
        ))}
      </Box>
      {children}
    </Box>
  );
};

export default NotificationsTemplate;
