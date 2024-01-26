"use client";

import { Box } from "@/components/ui/box";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  ChatBubbleIcon,
  ChevronLeftIcon,
  DrawingPinIcon,
  FileTextIcon,
  GearIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ProfileSidebar = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const session = useSession();
  const user = session.data?.user;

  const profilePath = [
    {
      href: [`/user/${user?.username}`],
      name: "Profile",
      icon: <PersonIcon />,
    },
    {
      href: [
        `/user/${user?.username}/notifications`,
        `/user/${user?.username}/notifications/mentions`,
      ],
      name: "Notifications",
      icon: <BellIcon />,
    },
    {
      href: [`/user/${user?.username}/comments`],
      name: "Comments",
      icon: <ChatBubbleIcon />,
    },
    {
      href: [`/user/${user?.username}/topics`],
      name: "Topics",
      icon: <FileTextIcon />,
    },
    {
      href: [`/user/${user?.username}/pinned`],
      name: "Pinned",
      icon: <DrawingPinIcon />,
    },
    {
      href: [`/user/${user?.username}/settings`],
      name: "Settings",
      icon: <GearIcon />,
    },
  ];

  return (
    <aside
      className={cn(
        "tw-relative",
        open ? "md:tw-w-[280px]" : "md:tw-w-[100px]",
        "tw-transition-[width]",
      )}
    >
      <Card className="md:tw-sticky tw-top-[5.1rem] tw-flex tw-flex-col">
        <CardHeader
          className={cn(
            "tw-px-2 tw-py-1 !tw-flex-row tw-border-b",
            open ? "tw-justify-between" : "tw-justify-end",
          )}
        >
          <Box
            className={cn(
              "!tw-flex-row tw-items-center tw-gap-2",
              open ? "" : "tw-w-0 tw-hidden",
            )}
          >
            <UserAvatar
              className={cn(
                "tw-ml-2",
                open ? "tw-opacity-100" : "tw-opacity-0",
              )}
            />
            <div className="tw-flex tw-flex-col tw-space-y-1">
              <p className="tw-text-sm tw-font-medium tw-leading-none">
                {"username"}
              </p>
              <p className="tw-text-xs tw-leading-none tw-text-muted-foreground">
                {"email"}
              </p>
            </div>
          </Box>
          <Button
            variant={"outline"}
            size={"icon"}
            className={cn("tw-h-8 !tw-m-0", open ? "tw-w-8" : "tw-w-full")}
            onClick={() => setOpen(!open)}
          >
            <ChevronLeftIcon className={cn(!open ? "tw-rotate-180" : "")} />
          </Button>
        </CardHeader>

        <CardContent className="tw-px-2 tw-pt-2 tw-pb-4 tw-space-y-1">
          {profilePath.map((path) => (
            <Link
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "tw-w-full !tw-justify-start tw-gap-2",
                path.href.includes(pathname) && "tw-bg-accent",
              )}
              href={`${path.href[0]}`}
            >
              <div className={cn("tw-shrink-0", open ? "" : "tw-ml-5")}>
                {path.icon}
              </div>
              <span
                className={cn(
                  path.href.includes(pathname) && "tw-font-bold",
                  open ? "tw-opacity-100" : "tw-opacity-0",
                  "tw-transition-opacity",
                )}
              >
                {path.name}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default ProfileSidebar;
