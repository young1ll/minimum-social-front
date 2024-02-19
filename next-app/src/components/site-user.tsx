"use client";

import { Button, buttonVariants } from "./ui/button";

import { Switch } from "./ui/switch";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserAvatar from "./user-avatar";
import { useAuthStore } from "@/lib/zustand/store";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const userSettingMenu = [
  {
    menuName: "Profile",
    endpoint: "",
  },
  {
    menuName: "Settings",
    endpoint: "settings",
  },
];

const userProtectedMenu = [
  {
    menuName: "My Topics",
    endpoint: "topics",
  },
  {
    menuName: "Settings",
    endpoint: "settings",
  },
];

const SiteUser = () => {
  const router = useRouter();
  const store = useAuthStore();
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);

  const { user } = store || sessionData || {};
  // TODO: user 가 없는 경우 SiteUser는 표시되지 않음

  //TODO: endpoint 수정
  const toggleDarkMode = async () => {
    if (user) {
      const { darkmode, ...userWithoutDarkmode } = user;

      store.setUser({
        darkmode: !user?.darkmode,
        ...userWithoutDarkmode,
      });
    }
  };

  const handleLogout = async () => {
    store.setUser(null);
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <UserAvatar />
      </PopoverTrigger>

      <PopoverContent className="!tw-p-0">
        <div className="tw-border-b tw-p-2">
          <p className="tw-text-sm tw-font-medium tw-leading-none">
            {sessionData?.user.username}
          </p>
          <p className="tw-text-xs tw-leading-none tw-text-muted-foreground">
            {sessionData?.user.email}
          </p>
        </div>

        <div className="tw-space-y-2">
          {userSettingMenu.map(({ menuName, endpoint }) => (
            <DropdownButton
              key={endpoint}
              username={user?.username as string}
              endpoint={endpoint}
              menuName={menuName}
              onOpenChange={setOpen}
            />
          ))}
        </div>

        <div className="tw-border-t">
          <div
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "tw-rounded-none",
              "tw-w-full !tw-justify-between",
            )}
          >
            Dark mode
            <Switch checked={user?.darkmode} onCheckedChange={toggleDarkMode} />
          </div>
        </div>

        <div className="tw-border-t">
          {userProtectedMenu.map(({ menuName, endpoint }) => (
            <DropdownButton
              key={endpoint}
              username={user?.username as string}
              endpoint={endpoint}
              menuName={menuName}
              onOpenChange={setOpen}
            />
          ))}
        </div>

        <div className="tw-border-t">
          <Button
            variant={"ghost"}
            className="tw-w-full tw-rounded-none !tw-justify-start"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SiteUser;

const DropdownButton = ({
  username,
  endpoint,
  menuName,
  onOpenChange,
}: {
  username: string;
  endpoint: string;
  menuName: string;
  onOpenChange?: (open: boolean) => void;
}) => {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "tw-rounded-none",
        "tw-w-full !tw-justify-start",
      )}
      href={`/user/${username}/${endpoint}`}
      onClick={() => onOpenChange?.(false)}
    >
      {menuName}
    </Link>
  );
};
