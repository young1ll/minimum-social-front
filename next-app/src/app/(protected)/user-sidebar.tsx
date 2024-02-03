"use client";

import { Box } from "@/components/ui/box";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BellIcon,
  DotsHorizontalIcon,
  DrawingPinIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import UserAvatar from "@/components/user-avatar";
import ThrowTopicButton from "./throw-topic-button";

// TODO: 모바일 사이드바 추가
const UserSidebar = () => {
  const pathname = usePathname();
  const session = useSession();
  const userSession = session.data?.user;

  const userMenu = [
    {
      name: "Home",
      href: ["/feeds"],
      icon: HomeIcon,
    },
    {
      name: "Explore",
      href: ["/explore"],
      icon: MagnifyingGlassIcon,
    },
    {
      name: "Notifications",
      href: ["/notifications"],
      icon: BellIcon,
    },
    {
      name: "Pinned",
      href: ["/pinned"],
      icon: DrawingPinIcon,
    },
    {
      name: "Profile",
      href: [`/${userSession?.username}`],
      icon: PersonIcon,
    },
  ];

  //TODO: 넓은 버전 추가
  return (
    <header className="tw-relative tw-flex tw-grow tw-shrink-0 tw-flex-col tw-select-none tw-items-end tw-z-50">
      <Box className="tw-w-[88px]">
        <Box className="tw-fixed tw-top-0 tw-h-full tw-items-stretch">
          <Box
            className={cn(
              "tw-justify-between tw-overflow-y-auto",
              "tw-h-full tw-w-[88px]",
              "tw-px-2",
              "tw-border-r",
            )}
          >
            <TooltipProvider>
              <div className="tw-flex tw-flex-col tw-items-center">
                <h1 className="tw-flex tw-grow tw-min-w-[32px] tw-justify-center tw-items-center tw-p-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={"/feeds"}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "!tw-p-1",
                        )}
                      >
                        <Image
                          src={"/logo.png"}
                          alt={"minimum-social"}
                          width={24}
                          height={24}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="tw-bg-zinc-500/90 tw-border-none tw-text-xs tw-text-white"
                    >
                      minumum-social
                    </TooltipContent>
                  </Tooltip>
                </h1>

                <nav className="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-p-2">
                  {userMenu.map((item) => (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href[0]}
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                              size: "icon",
                            }),
                            "tw-p-2",
                            item.href.some((href) => pathname.includes(href)) &&
                              "tw-text-orange-500 tw-font-bold",
                            "hover:tw-text-orange-500",
                          )}
                        >
                          <item.icon className="tw-h-full tw-w-full" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="tw-bg-zinc-500/90 tw-border-none tw-text-xs tw-text-white"
                      >
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  ))}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/settings`}
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                            size: "icon",
                          }),
                          "tw-p-2",
                          "hover:tw-text-orange-500",
                        )}
                      >
                        <DotsHorizontalIcon className="tw-h-full tw-w-full" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="tw-bg-zinc-500/90 tw-border-none tw-text-xs tw-text-white"
                    >
                      More
                    </TooltipContent>
                  </Tooltip>
                </nav>

                <ThrowTopicButton />
              </div>

              <div className="tw-flex tw-flex-col tw-items-center tw-p-4">
                <Popover>
                  <Tooltip>
                    <PopoverTrigger>
                      <TooltipTrigger asChild>
                        <UserAvatar
                          className="!tw-border-primary tw-border"
                          profileImage={userSession?.profileImage}
                          username={userSession?.username}
                          size={"xl"}
                        />
                      </TooltipTrigger>
                    </PopoverTrigger>
                    <TooltipContent
                      side="right"
                      className="tw-bg-zinc-500/90 tw-border-none tw-text-xs tw-text-white"
                    >
                      Account
                    </TooltipContent>
                  </Tooltip>
                  <PopoverContent className="!tw-p-0">
                    <Box>
                      <Link
                        href={`/settings`}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "!tw-justify-start",
                          "!tw-text-base",
                        )}
                      >
                        Account Setting
                      </Link>
                    </Box>
                    <Box className="tw-border-t">
                      <Button
                        variant={"ghost"}
                        className="!tw-justify-start !tw-text-base"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        Logout
                      </Button>
                    </Box>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipProvider>
          </Box>
        </Box>
      </Box>
    </header>
  );
};

export default UserSidebar;
