"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  CardStackIcon,
  ChatBubbleIcon,
  ChevronLeftIcon,
  DrawingPinFilledIcon,
  FileIcon,
} from "@radix-ui/react-icons";
import UserAvatar from "../user-avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Box } from "../ui/box";
import { useState } from "react";
import { useAuthStore } from "@/lib/zustand/store";

/**
 * FeedsPage Sidebar
 */
const FeedSidebar = () => {
  const [open, setOpen] = useState(true);
  const { user } = useAuthStore();

  const username = user?.username;
  const email = user?.email;

  const feedSidebarLinks = [
    {
      key: "followings",
      icon: "Folowings:",
      value: 115,
      href: `/user/${username}/followings`,
    },
    {
      key: "followers",
      icon: "Followers:",
      value: 210,
      href: `/user/${username}/followers`,
    },
    {
      key: "topics",
      icon: <FileIcon />,
      value: 15,
      href: `/user/${username}/topics`,
    },
    {
      key: "comments",
      icon: <ChatBubbleIcon />,
      value: 25,
      href: `/user/${username}/comments`,
    },
    {
      key: "pinned",
      icon: <DrawingPinFilledIcon />,
      value: 1,
      href: `/user/${username}/pinned`,
    },
    {
      key: "voted",
      icon: <CardStackIcon />,
      value: 10,
      href: `/user/${username}/voted`,
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
      <Card className="md:tw-sticky tw-top-[5.1rem] tw-overflow-hidden">
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
                {username}
              </p>
              <p className="tw-text-xs tw-leading-none tw-text-muted-foreground">
                {email}
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

        <CardContent className="!tw-p-2">
          <div
            className={cn(
              "tw-grid tw-gap-4",
              open ? "tw-grid-cols-2" : "tw-grid-cols-1",
            )}
          >
            {feedSidebarLinks.map((link) =>
              (!open && link.key === "followings") ||
              (!open && link.key === "followers") ? null : (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "!tw-h-6 !tw-justify-start tw-items-center tw-gap-2",
                  )}
                >
                  {link.icon}
                  <span>{link.value}</span>
                </Link>
              ),
            )}
          </div>
        </CardContent>

        <CardFooter className="tw-flex tw-justify-between !tw-p-2 tw-border-t">
          {/* 광고 */}
        </CardFooter>
      </Card>
    </aside>
  );
};

export default FeedSidebar;
